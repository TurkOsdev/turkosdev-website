import { siteConfig } from "@/lib/site";

export type Topic = {
  index: string;
  title: string;
  description: string;
  keywords: string[];
  path: string;
};

const notes = siteConfig.links.notes;

/**
 * osdev-notlari deposunun bölüm yapısı. Sıra, temelden ileri konuya doğru
 * ilerleyen depo sırasıyla aynıdır.
 */
export const topics: Topic[] = [
  {
    index: "00",
    title: "Giriş",
    description:
      "OSDev nedir, nereden başlanır ve çalışan bir geliştirme ortamı nasıl kurulur.",
    keywords: ["Başlangıç", "Toolchain", "QEMU"],
    path: `${notes}/tree/main/00-giris`,
  },
  {
    index: "01",
    title: "Mimari",
    description:
      "x86, x86-64, ARM64 ve RISC-V mimarilerinin çalışma modları ve farkları.",
    keywords: ["x86-64", "ARM64", "RISC-V"],
    path: `${notes}/tree/main/01-mimari`,
  },
  {
    index: "02",
    title: "Boot",
    description:
      "BIOS ve UEFI, bootloader yazımı ile Multiboot ve Limine gibi boot protokolleri.",
    keywords: ["BIOS", "UEFI", "Bootloader"],
    path: `${notes}/tree/main/02-boot`,
  },
  {
    index: "03",
    title: "Assembly",
    description:
      "Register'lar, calling convention'lar ve interrupt mekanizmalarıyla assembly temelleri.",
    keywords: ["NASM", "Register", "Interrupt"],
    path: `${notes}/tree/main/03-assembly`,
  },
  {
    index: "04",
    title: "Kernel",
    description:
      "Kernel yapısı, GDT ve IDT kurulumu, exception işleme ve system call arayüzü.",
    keywords: ["GDT", "IDT", "Syscall"],
    path: `${notes}/tree/main/04-kernel`,
  },
  {
    index: "05",
    title: "Memory",
    description:
      "Fiziksel ve sanal bellek yönetimi, paging, heap ve allocator tasarımı.",
    keywords: ["Paging", "Heap", "Allocator"],
    path: `${notes}/tree/main/05-memory`,
  },
  {
    index: "06",
    title: "Process",
    description:
      "Process ve thread modelleri, context switch ve scheduling algoritmaları.",
    keywords: ["Thread", "Context switch", "Scheduler"],
    path: `${notes}/tree/main/06-process`,
  },
  {
    index: "07",
    title: "Drivers",
    description:
      "Donanım erişimi, PCI ve USB veri yolları, depolama ve giriş aygıtı sürücüleri.",
    keywords: ["PCI", "USB", "IRQ"],
    path: `${notes}/tree/main/07-drivers`,
  },
  {
    index: "08",
    title: "Filesystems",
    description:
      "Dosya sistemi kavramları, VFS katmanı ve gerçek filesystem implementasyonları.",
    keywords: ["VFS", "FAT", "ext2"],
    path: `${notes}/tree/main/08-filesystems`,
  },
  {
    index: "09",
    title: "Userspace",
    description:
      "libc, ELF ve diğer executable format'ları, userspace geçişi ve shell.",
    keywords: ["ELF", "libc", "Shell"],
    path: `${notes}/tree/main/09-userspace`,
  },
  {
    index: "10",
    title: "Networking",
    description:
      "Ethernet, ARP, IPv4, UDP ve TCP katmanlarının kernel içinde kurulması.",
    keywords: ["Ethernet", "IPv4", "TCP"],
    path: `${notes}/tree/main/10-networking`,
  },
  {
    index: "11",
    title: "Graphics",
    description:
      "Framebuffer erişimi, DRM ve KMS ile modern grafik sistemlerinin yapısı.",
    keywords: ["Framebuffer", "DRM", "KMS"],
    path: `${notes}/tree/main/11-graphics`,
  },
  {
    index: "12",
    title: "Kaynaklar",
    description:
      "Kitaplar, architecture manual'ları, makaleler ve incelenmeye değer projeler.",
    keywords: ["Kitap", "Manual", "Proje"],
    path: `${notes}/tree/main/resources`,
  },
];
