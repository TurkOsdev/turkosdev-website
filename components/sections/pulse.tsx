import AnimatedContent from "@/components/reactbits/AnimatedContent";
import CountUp from "@/components/reactbits/CountUp";
import { getOrgMembers, getRepoStars } from "@/lib/github";
import { topics } from "@/lib/topics";

export async function Pulse() {
  const [members, stars] = await Promise.all([getOrgMembers(), getRepoStars()]);

  const commits = members.reduce((total, member) => total + member.contributions, 0);

  const items = [
    { value: members.length, label: "üye" },
    { value: commits, label: "commit" },
    { value: stars, label: "yıldız" },
    { value: topics.length, label: "bölüm" },
    // Veri gelmediğinde "0" göstermek yerine sayacı tamamen gizle.
  ].filter((item) => item.value > 0);

  return (
    <section className="border-t border-rule">
      <AnimatedContent distance={40} duration={0.7} threshold={0.15}>
        {/* Sayaç sayısı veriye göre değiştiği için sabit sütun yerine akış. */}
        <dl className="mx-auto flex w-full max-w-[76rem] flex-wrap gap-x-16 gap-y-10 px-6 py-14 md:gap-x-24 md:px-10 md:py-16">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dd className="display text-[clamp(2.5rem,4.5vw,3.5rem)] tabular-nums">
                <CountUp to={item.value} duration={1.6} separator="." />
              </dd>
              <dt className="label">{item.label}</dt>
            </div>
          ))}
        </dl>
      </AnimatedContent>
    </section>
  );
}
