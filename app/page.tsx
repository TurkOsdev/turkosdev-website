import { Community } from "@/components/sections/community";
import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Pulse } from "@/components/sections/pulse";

/** Topluluk sayaçları GitHub'dan geldiği için sayfa saatte bir tazelenir. */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pulse />
      <Community />
      <Cta />
    </>
  );
}
