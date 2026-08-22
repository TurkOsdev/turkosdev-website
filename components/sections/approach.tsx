const principles = [
  {
    index: "01",
    title: "Tanım değil, mekanizma",
    description:
      "Her not; kavramın neden gerekli olduğunu, donanım seviyesinde nasıl çalıştığını ve kernel tarafından nasıl kullanıldığını birlikte anlatır.",
  },
  {
    index: "02",
    title: "Birincil kaynak",
    description:
      "Bilgiler; CPU üreticilerinin architecture manual'ları, donanım ve protokol spesifikasyonları ile resmi standartlara dayandırılır.",
  },
  {
    index: "03",
    title: "Küçük kod örnekleri",
    description:
      "Örnekler kavramı göstermeye yetecek kadar küçük tutulur. Mimariler arası davranış farkları ayrıca belirtilir.",
  },
  {
    index: "04",
    title: "Tutarlı terminoloji",
    description:
      "İngilizce teknik terimler, aramalarda ve resmi dokümantasyonda karşılığı bulunabilsin diye gerektiğinde korunur.",
  },
];

const anatomy = [
  "Kavram neden var?",
  "Donanımda nasıl çalışır?",
  "Kernel bunu nasıl kullanır?",
  "Gerçek bir implementasyon",
  "Kullanılan kaynaklar",
];

export function Approach() {
  return (
    <section id="yaklasim" className="scroll-mt-16 border-t border-rule py-28 md:py-40">
      <div className="mx-auto grid w-full max-w-[76rem] gap-y-20 px-6 md:grid-cols-12 md:gap-x-16 md:px-10">
        {/* Sol kenar sütunu: etiket ve kenar notu. */}
        <div className="order-2 md:order-1 md:col-span-3">
          <p className="label hidden md:block">Yaklaşım</p>

          <div className="md:mt-14">
            <p className="label">Bir notun anatomisi</p>
            <ol className="mt-5 space-y-2.5 font-mono text-xs text-muted-foreground">
              {anatomy.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Ana kolon: sol marjdan içeri çekilmiş başlık. */}
        <div className="order-1 md:order-2 md:col-span-8 md:col-start-5">
          <p className="label md:hidden">Yaklaşım</p>
          <h2 className="display mt-6 text-[clamp(2.25rem,4.6vw,3.75rem)] md:mt-0">
            Ezberletmeyen,
            <br />
            gerekçesini anlatan notlar
          </h2>

          <p className="measure mt-8 text-[1.0625rem] leading-relaxed text-muted-foreground">
            Buradaki notlar yalnızca kavramların tanımlarını vermeyi amaçlamaz;
            bir konunun neden o şekilde çözüldüğünü de açıklar.
          </p>

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 md:mt-20">
            {principles.map((principle) => (
              <div key={principle.index}>
                <p className="font-mono text-xs text-muted-foreground">
                  {principle.index}
                </p>
                <h3 className="mt-3 text-base font-medium">{principle.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
