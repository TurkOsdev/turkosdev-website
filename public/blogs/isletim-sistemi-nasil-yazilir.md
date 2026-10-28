+++
baslik = "İşletim Sistemi Nasıl Yazılır?"
aciklama = "Sıfırdan işletim sistemi yazmak için gereken bilgi, araçlar ve adımlar: cross compiler, bootloader, kernel ve bellek yönetimi. Türkçe başlangıç rehberi."
yazar = "Tuna Kılıç <tuna@tunakilic.com>"
tarih = 2026-10-28
etiketler = ["osdev", "kernel", "işletim sistemi", "başlangıç"]
+++

"Kendi işletim sistemimi yazabilir miyim?" sorusunun kısa cevabı: **evet**. Linux ya da Windows ölçeğinde bir sistem yazmayacaksınız ama ekrana yazı basan, klavyeden girdi alan, bellek yöneten ve birden fazla programı aynı anda çalıştıran bir kernel, düzenli çalışan tek bir kişinin birkaç ayda ulaşabileceği bir hedef.

Bu yazı, **işletim sistemi nasıl yazılır** sorusuna adım adım bir yol haritası çiziyor: başlamadan önce neleri bilmeniz gerektiğini, hangi araçları kurmanız gerektiğini ve ilk satırdan userspace'e kadar hangi sırayla ilerlemenin mantıklı olduğunu anlatıyor. Her adımın ayrıntısı, topluluğun açık kaynak not deposu [osdev-notlari](https://github.com/TurkOsdev/osdev-notlari) içinde ayrı bir bölüm olarak duruyor ([bölüm listesi](/konular)); burada amaç büyük resmi görmek. Okumakla yetinmeyip hemen kod yazmak isterseniz, topluluğun hazırladığı [kernel-template](https://github.com/TurkOsdev/kernel-template) deposu da yazının ilerleyen bölümlerinde anlatılıyor.

## İşletim sistemi geliştirme (OSDev) nedir?

OSDev, donanımla doğrudan konuşan ve diğer programların üzerinde çalıştığı yazılımı, yani işletim sistemini geliştirme işidir. Uygulama geliştirirken kullandığınız her şey (`printf`, `malloc`, dosyalar, thread'ler) aslında işletim sisteminin size sunduğu hizmetlerdir. OSDev'de bunları kullanmazsınız, **siz yazarsınız**.

Bir işletim sisteminin merkezinde **kernel** bulunur. Kernel'in temel görevleri şunlardır:

- İşlemciyi hazırlamak ve kesmeleri (interrupt) yönetmek
- Fiziksel ve sanal belleği dağıtmak
- Process'leri oluşturmak ve aralarında geçiş yapmak (scheduling)
- Donanıma sürücüler üzerinden erişmek
- Programlara system call arayüzü sunmak

Shell, dosya yöneticisi veya grafik arayüz gibi gördüğünüz her şey bu temelin üstüne kurulur.

## Başlamadan önce bilmeniz gerekenler

OSDev, programlamaya yeni başlayanlar için uygun bir ilk proje değildir. Hata ayıklayıcınız, standart kütüphaneniz ve hata mesajlarınız olmayacak; bir şey ters gittiğinde makine sessizce yeniden başlayabilir. Bu yüzden şu temellerin sağlam olması gerekir:

- **C dili:** Pointer'lar, bit işlemleri, struct düzeni, `volatile` ve tanımsız davranış (undefined behavior) konusunda rahat olmalısınız. Rust veya Zig de kullanılabilir ama kaynakların çoğu C üzerinden anlatılır.
- **Assembly okuryazarlığı:** Bütün kernel'i assembly ile yazmayacaksınız, ama boot kodu, interrupt girişleri ve context switch assembly gerektirir. Register'ları ve calling convention'ı okuyabiliyor olmak yeterlidir.
- **Bilgisayar mimarisi:** İşlemcinin bellekle nasıl konuştuğunu, stack'in nasıl çalıştığını ve interrupt'ın ne olduğunu kabaca bilmek.
- **Komut satırı ve derleme araçları:** `make`, linker ve derleyici bayrakları günlük işiniz olacak.

Bu konularda eksiğiniz varsa arşivdeki [Assembly](https://github.com/TurkOsdev/osdev-notlari/tree/main/03-assembly) ve [Mimari](https://github.com/TurkOsdev/osdev-notlari/tree/main/01-mimari) bölümleri iyi bir başlangıç noktasıdır.

## Hangi mimariyi seçmelisiniz?

İlk kararınız hedef mimari olacak. Bugün pratikte üç seçenek var:

| Mimari | Artısı | Eksisi |
| --- | --- | --- |
| **x86-64** | En çok kaynak ve örnek; elinizdeki bilgisayarda çalışır | Onlarca yıllık geriye uyumluluk yükü (real mode, segmentasyon, GDT) |
| **RISC-V** | Sade ve modern tasarım; belgeleri okunaklı | Gerçek donanım daha az yaygın, kaynak daha az |
| **ARM64** | Telefonlar, Raspberry Pi, Apple Silicon | Platformlar arası farklar büyük, boot süreci karmaşık |

Kaynak bolluğu nedeniyle ilk proje için **x86-64** öneriyoruz. Bu yazıdaki örnekler de x86-64 üzerinden ilerliyor. Mimariler arasındaki farkları [Mimari bölümünde](https://github.com/TurkOsdev/osdev-notlari/tree/main/01-mimari) ayrıntılı bulabilirsiniz.

## Geliştirme ortamını kurmak

### Cross compiler

Sisteminizdeki `gcc`, Linux (veya macOS, Windows) için program üretecek şekilde ayarlanmıştır: libc'ye bağlanır, işletim sisteminin varlığını varsayar. Kernel ise **hiçbir işletim sisteminin olmadığı** bir ortamda çalışır. Bu yüzden ya `x86_64-elf` hedefli bir GCC cross compiler derlemeniz ya da Clang'i doğru hedefle kullanmanız gerekir:

```sh
# Clang tek binary'de bütün hedefleri destekler
clang --target=x86_64-unknown-none-elf -ffreestanding -c kernel.c -o kernel.o
```

Kernel kodunu derlerken kullanılan tipik bayraklar şunlardır:

```sh
-ffreestanding        # standart kütüphane ve hosted ortam varsayma
-fno-stack-protector  # stack koruması libc desteği ister
-fno-pic -mcmodel=kernel  # higher-half kernel adresleri için
-mno-red-zone         # interrupt'lar stack'i bozmasın
-mno-sse -mno-mmx -mno-80387  # FPU durumu henüz kaydedilmiyor
-nostdlib             # libc'ye bağlama
```

`-mno-red-zone` özellikle önemli: x86-64 System V ABI, fonksiyonların stack işaretçisinin altındaki 128 byte'ı izinsiz kullanmasına izin verir. Kernel'de bir interrupt geldiğinde işlemci tam da bu bölgeye yazar ve verileriniz sessizce bozulur.

### Emülatör: QEMU

Her denemede bilgisayarı yeniden başlatmak yerine **QEMU** kullanacaksınız. QEMU hızlıdır, seri port çıktısını terminale yönlendirebilir ve hata ayıklamaya yardımcı olacak bayraklar sunar:

```sh
qemu-system-x86_64 -cdrom os.iso -m 256M -serial stdio \
  -no-reboot -no-shutdown -d int
```

`-no-reboot` ve `-d int`, bir **triple fault** yaşandığında makinenin sessizce yeniden başlaması yerine durmasını ve hangi kesmenin tetiklendiğini görmenizi sağlar. OSDev'in ilk haftalarında bu iki bayrak en iyi dostunuz olacak. GDB'yi de `-s -S` bayraklarıyla QEMU'ya bağlayıp kernel'inizi adım adım izleyebilirsiniz.

Ortam kurulumunun ayrıntıları [Giriş bölümünde](https://github.com/TurkOsdev/osdev-notlari/tree/main/00-giris) anlatılıyor.

## Adım 1: Bootloader ile kernel'i yüklemek

Bilgisayar açıldığında firmware (BIOS veya UEFI) çalışır ve bir **bootloader** arar. Bootloader'ın görevi kernel'inizi belleğe yüklemek, işlemciyi uygun moda geçirmek ve kontrolü kernel'e devretmektir.

Kendi bootloader'ınızı yazmak öğretici bir deneyimdir ama **ilk proje için önermiyoruz**. Bootloader'ı tamamlamak haftalar sürebilir ve bu sürede kernel'e tek satır yazmamış olursunuz. Bunun yerine hazır bir boot protokolü kullanın:

- **Limine:** Modern, x86-64 ve UEFI odaklı. Kernel'i doğrudan 64-bit long mode'da, higher-half adreste ve paging açık şekilde başlatır. Bellek haritası ve framebuffer gibi bilgileri yapılandırılmış biçimde verir.
- **GRUB + Multiboot2:** Köklü ve yaygın. Ancak kernel'i 32-bit protected mode'da başlattığı için long mode'a geçişi sizin yapmanız gerekir.
- **[kernel-template](https://github.com/TurkOsdev/kernel-template):** Türk OSDev topluluğunun Legacy BIOS için hazırladığı şablon. GRUB veya Limine kullanmaz. NASM ile yazılmış iki aşamalı bir bootloader, işlemciyi real mode'dan protected mode'a, oradan long mode'a geçirir. A20 hattını açar, GDT'yi ve paging tablolarını kurar, ardından C ile yazılmış kernel'i yükler. Bootloader'ı sıfırdan yazmadan, nasıl çalıştığını okunaklı ve küçük bir kod tabanında görebilirsiniz.

Bu seçenekler ve BIOS/UEFI farkları ve BIOS/UEFI farkları [Boot bölümünde](https://github.com/TurkOsdev/osdev-notlari/tree/main/02-boot) ayrıntılı anlatılıyor.

## Adım 2: İlk kernel ve ilk çıktı

Bootloader kontrolü kernel'inize verdiğinde elinizde ne `printf` vardır ne de ekran sürücüsü. İlk iş kendinize bir **çıktı kanalı** açmak olmalı. Bunun en basit yolu seri porttur: birkaç `in`/`out` komutuyla çalışır ve QEMU'da `-serial stdio` ile doğrudan terminalinize düşer.

```c
#include <stdint.h>

#define COM1 0x3F8

static inline void outb(uint16_t port, uint8_t value) {
    __asm__ volatile ("outb %0, %1" : : "a"(value), "Nd"(port));
}

static inline uint8_t inb(uint16_t port) {
    uint8_t value;
    __asm__ volatile ("inb %1, %0" : "=a"(value) : "Nd"(port));
    return value;
}

static void serial_init(void) {
    outb(COM1 + 1, 0x00); // kesmeleri kapat
    outb(COM1 + 3, 0x80); // bölen ayarı için DLAB'ı aç
    outb(COM1 + 0, 0x03); // bölen = 3 → 38400 baud
    outb(COM1 + 1, 0x00);
    outb(COM1 + 3, 0x03); // 8 bit, parity yok, 1 stop bit
    outb(COM1 + 2, 0xC7); // FIFO'yu aç ve temizle
    outb(COM1 + 4, 0x0B);
}

static void serial_write(const char *text) {
    for (; *text; text++) {
        while ((inb(COM1 + 5) & 0x20) == 0) {} // gönderim tamponu boşalsın
        outb(COM1, (uint8_t)*text);
    }
}

void kmain(void) {
    serial_init();
    serial_write("Merhaba, kernel!\n");

    for (;;) {
        __asm__ volatile ("cli; hlt");
    }
}
```

Terminalinizde `Merhaba, kernel!` yazısını gördüğünüz an, OSDev'in en tatmin edici anlarından biridir. Bundan sonra yapacağınız ilk iş bu fonksiyonların üstüne küçük bir `kprintf` yazmak olmalı. Sayıları onaltılık tabanda basabilmek sonraki bütün adımlarda hata ayıklamanın temeli olacak.

Kernel'in sonsuz döngüde `hlt` ile beklemesi de önemli: `kmain` geri dönerse işlemci belleğin rastgele bir yerinden komut çalıştırmaya devam eder.

### Hazır şablonla hemen başlamak

Toolchain, linker script ve boot ayarlarıyla uğraşmadan doğrudan kernel koduna geçmek istiyorsanız [kernel-template](https://github.com/TurkOsdev/kernel-template) deposunu klonlayıp tek komutla çalıştırabilirsiniz:

```sh
git clone https://github.com/TurkOsdev/kernel-template
cd kernel-template
make run
```

Gereken araçlar `nasm`, `binutils`, `gcc` ve QEMU'dur; dağıtımlara göre kurulum komutları deponun README'sinde yer alıyor. Terminalde `ABCDK` harflerini görüyorsanız kernel'e ulaşılmış demektir. Her harf boot sürecinin bir aşamasını gösterir: `A` ikinci aşamanın başladığını, `B` kernel'in diskten okunduğunu, `C` protected mode'a, `D` long mode'a geçildiğini, `K` ise `kmain`'e ulaşıldığını anlatır. Bir harf eksikse sorunun hangi aşamada olduğunu hemen bilirsiniz. Bu, yukarıda anlatılan "önce çıktı kanalı" fikrinin bootloader düzeyindeki karşılığıdır.

Şablonda kernel tarafı da hazır bir iskeletle gelir: VGA metin modu sürücüsü, bir terminal katmanı ve port'a yazmak için bir `outb` yardımcısı. Sonraki adımları (GDT, IDT, bellek yönetimi) bu iskeletin üstüne kendiniz ekleyebilirsiniz.

## Adım 3: GDT, IDT ve interrupt'lar

Kernel'in ilk ciddi görevi işlemcinin tablolarını kendi kontrolüne almaktır:

- **GDT (Global Descriptor Table):** x86-64'te segmentasyon büyük ölçüde etkisizdir, ama kernel ve user kod/veri segmentleri ile TSS için yine de bir GDT tanımlamanız gerekir.
- **IDT (Interrupt Descriptor Table):** Her interrupt ve exception için hangi fonksiyonun çalışacağını belirler.

İlk hedef, **exception handler'larını** kurmaktır. Sıfıra bölme veya page fault gibi bir hata olduğunda makinenin yeniden başlaması yerine ekrana "Page fault, adres: 0x..." yazdırabiliyorsanız, sonraki her adımda hataları dakikalar içinde bulursunuz.

Ardından donanım kesmelerine geçilir: eski sistemlerde 8259 PIC, modern sistemlerde APIC. Bir timer kesmesini (PIT veya APIC timer) ve klavye kesmesini çalıştırdığınızda kernel'iniz artık dış dünyaya tepki veriyor demektir.

Bu konuların hepsi [Kernel bölümünde](https://github.com/TurkOsdev/osdev-notlari/tree/main/04-kernel) ele alınıyor.

## Adım 4: Bellek yönetimi

Bellek yönetimi, çoğu OSDev projesinin takıldığı yerdir. Üç katmanı sırayla düşünmek işi kolaylaştırır:

1. **Fiziksel bellek yöneticisi (PMM):** Bootloader'ın verdiği bellek haritasını okur ve hangi 4 KiB'lık fiziksel sayfaların boş olduğunu takip eder. Bitmap veya serbest liste (free list) ile başlamak yeterlidir.
2. **Sanal bellek yöneticisi (VMM):** Paging tablolarını yönetir; sanal adresleri fiziksel sayfalara eşler. x86-64'te bu dört (veya beş) seviyeli bir tablo yapısıdır. Her process'in kendi adres alanına sahip olmasını sağlayan katman budur.
3. **Heap allocator:** Kernel içinde `kmalloc`/`kfree` sağlar. Önce basit bir bump allocator, sonra serbest liste veya slab allocator yazılabilir.

Bu sıralama önemli: heap, sanal belleğe; sanal bellek de fiziksel bellek yöneticisine dayanır. Ayrıntılar [Memory bölümünde](https://github.com/TurkOsdev/osdev-notlari/tree/main/05-memory).

## Adım 5: Process'ler ve scheduling

Bellek yönetimi ve timer kesmesi hazır olduğunda kernel'iniz birden fazla işi aynı anda yürütebilir hale gelir:

- Her görev için bir **kernel stack** ve kaydedilmiş register durumu tutan bir yapı tanımlanır.
- **Context switch**, bir görevin register'larını kaydedip diğerininkini yükleyen küçük bir assembly fonksiyonudur.
- Timer kesmesi her geldiğinde **scheduler** sıradaki görevi seçer. Round-robin ile başlamak yeterlidir.

Kernel thread'leri çalıştığında bir sonraki eşik, kodun **ring 3**'te, yani kullanıcı modunda çalıştırılmasıdır. Bunun için TSS, user segmentleri ve `syscall`/`sysret` mekanizması devreye girer. [Process bölümü](https://github.com/TurkOsdev/osdev-notlari/tree/main/06-process) bu geçişi adım adım anlatıyor.

## Adım 6: Sürücüler, dosya sistemi ve userspace

Bu noktadan sonra yol çatallanır; ilgi alanınıza göre seçim yapabilirsiniz:

- **Sürücüler:** PCI veri yolunu taramak, ardından AHCI/NVMe gibi bir depolama sürücüsü veya USB yazmak. ([Drivers](https://github.com/TurkOsdev/osdev-notlari/tree/main/07-drivers))
- **Dosya sistemi:** Bir VFS katmanı ve önce bellek içi bir dosya sistemi (initrd), sonra FAT veya ext2. ([Filesystems](https://github.com/TurkOsdev/osdev-notlari/tree/main/08-filesystems))
- **Userspace:** ELF dosyalarını yüklemek, küçük bir libc yazmak (veya bir tanesini port etmek) ve ilk shell'i çalıştırmak. ([Userspace](https://github.com/TurkOsdev/osdev-notlari/tree/main/09-userspace))
- **Ağ ve grafik:** Ethernet sürücüsünden TCP'ye kadar bir ağ yığını ya da framebuffer üzerine bir pencere sistemi. ([Networking](https://github.com/TurkOsdev/osdev-notlari/tree/main/10-networking), [Graphics](https://github.com/TurkOsdev/osdev-notlari/tree/main/11-graphics))

Kendi shell'inizde `ls` yazıp kendi dosya sisteminizdeki dosyaları gördüğünüzde artık gerçek anlamda bir işletim sisteminiz var demektir.

## Yeni başlayanların sık yaptığı hatalar

- **Bootloader ile başlamak:** Motivasyonun en yüksek olduğu ilk haftaları kernel'e hiç dokunmadan geçirmek. Hazır bir bootloader kullanın, isterseniz sonra kendinizinkini yazın.
- **Tutorial kodunu anlamadan kopyalamak:** Eski tutorial'larda bilinen hatalar vardır. Kopyaladığınız kod çalışmayı bıraktığında neden bozulduğunu bulamazsınız.
- **Hata ayıklama altyapısını ertelemek:** `kprintf`, exception handler'ları ve QEMU'nun `-d int` çıktısı olmadan ilerlemek, her hatayı saatlerce aramak demektir.
- **Erken optimizasyon:** İlk allocator'ınızın hızlı olması gerekmez, doğru olması gerekir.
- **Belgeleri okumamak:** Intel ve AMD kılavuzları ilk bakışta korkutucudur ama en güvenilir kaynak onlardır. İhtiyacınız olan bölümü açıp okumayı alışkanlık haline getirin.

## Sıkça sorulan sorular

### İşletim sistemi yazmak ne kadar sürer?

Ekrana yazı basan bir kernel birkaç günde, interrupt ve bellek yönetimi olan bir kernel birkaç haftada çıkar. Userspace'te program çalıştıran bir sisteme ulaşmak, düzenli çalışarak genellikle birkaç ay sürer. OSDev bir maraton; ara hedefler koymak motivasyonu korur.

### C bilmeden işletim sistemi yazılabilir mi?

Rust, Zig veya C++ ile de kernel yazılabilir ve bunların her biri için topluluk projeleri bulunur. Ancak donanım belgeleri, örnek kodlar ve tartışmaların büyük kısmı C üzerinden yürür. Başka bir dil seçseniz bile C okuyabiliyor olmanız gerekir.

### Linux kaynak kodunu okuyarak öğrenebilir miyim?

Linux, onlarca yılın birikimiyle milyonlarca satıra ulaşmış bir kod tabanı. Başlangıç için xv6 gibi eğitim amaçlı küçük kernel'ler çok daha verimlidir. Linux'u belirli bir mekanizmanın gerçek dünyada nasıl çözüldüğünü görmek için referans olarak kullanmak daha uygun olur.

### Gerçek donanımda çalıştırabilir miyim?

Evet. QEMU'da çalışan bir kernel'i USB belleğe yazıp gerçek bilgisayarda başlatabilirsiniz. Ancak gerçek donanım, emülatörün hoş gördüğü hataları affetmez; ilk denemelerde farklı davranışlarla karşılaşmanız normaldir.

## Sonraki adım

İşletim sistemi yazmak uzun ama son derece öğretici bir yolculuk. Bilgisayarın en alt katmanında neler olduğunu anladığınızda, yazdığınız her programa farklı bakmaya başlarsınız.

Türk OSDev topluluğu olarak bu yolu Türkçe kaynaklarla kolaylaştırmaya çalışıyoruz. Başlamak için iki deponuz var:

- **[osdev-notlari](https://github.com/TurkOsdev/osdev-notlari):** Girişten ağ ve grafiğe kadar 13 bölümlük Türkçe not arşivi. Bölümleri [Konular sayfasında](/konular) sırayla takip edebilirsiniz.
- **[kernel-template](https://github.com/TurkOsdev/kernel-template):** NASM bootloader ve C kernel'den oluşan, `make run` ile çalışan x86-64 başlangıç şablonu.

Takıldığınız yerde [GitHub üzerinden issue açabilir](https://github.com/TurkOsdev/osdev-notlari/issues) ya da öğrendiklerinizi yazarak [arşive katkı verebilirsiniz](/katki).
