import { siteConfig } from "@/lib/site";

const steps = [
  "Konunun mevcut içerikte nereye oturduğunu belirleyin.",
  "Teknik bilgileri güvenilir kaynaklarla doğrulayın.",
  "Gereksiz teori yerine anlaşılır ve teknik bir anlatım kullanın.",
  "Kod örneklerini mümkün olduğunca küçük ve açıklayıcı tutun.",
  "Kullandığınız önemli kaynakları notun sonunda belirtin.",
];

const documents = [
  {
    name: "CONTRIBUTING.md",
    description: "Katkı süreci ve içerik standartları",
    href: siteConfig.links.contributing,
  },
  {
    name: "SABLON.md",
    description: "Notların takip ettiği yapı",
    href: siteConfig.links.template,
  },
  {
    name: "TERIMLER.md",
    description: "Hangi terim Türkçe, hangisi İngilizce",
    href: siteConfig.links.terms,
  },
  {
    name: "CODE_OF_CONDUCT.md",
    description: "Topluluk davranış kuralları",
    href: siteConfig.links.codeOfConduct,
  },
];

export function Contribute() {
  return (
    <section id="katki" className="scroll-mt-16 border-t border-rule py-28 md:py-40">
      <div className="mx-auto w-full max-w-[76rem] px-6 md:px-10">
        <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-6">
            <p className="label">Katkı</p>
            <h2 className="display mt-6 text-[clamp(2.25rem,4.6vw,3.75rem)]">
              Bir bölümü üstlenmek için
              <br />
              izin beklemeniz gerekmiyor
            </h2>
            <p className="measure mt-8 text-[1.0625rem] leading-relaxed text-muted-foreground">
              Her bölümün README dosyasında planlanan konular ve durumları
              listelenir. İşaretsiz konulardan herhangi birini üstlenebilir,
              eksik bir açıklamayı düzeltebilir veya örnek kod ekleyebilirsiniz.
            </p>
          </div>

          <ol className="md:col-span-5 md:col-start-8 md:pt-14">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex gap-6 border-t border-rule py-5 last:border-b"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-24 md:mt-32">
          <p className="label">Başlamadan önce okuyun</p>
          <ul className="mt-8 grid gap-x-16 gap-y-7 sm:grid-cols-2 md:max-w-4xl">
            {documents.map((doc) => (
              <li key={doc.name}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex flex-col gap-1 outline-none"
                >
                  <span className="font-mono text-sm text-foreground transition-colors group-hover:text-primary group-focus-visible:text-primary">
                    {doc.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {doc.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
