import { Approach } from "@/components/sections/approach";
import { Contribute } from "@/components/sections/contribute";
import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Topics } from "@/components/sections/topics";

export default function HomePage() {
  return (
    <>
      <Hero />
      <hr className="hairline" />
      <Topics />
      <hr className="hairline" />
      <Approach />
      <hr className="hairline" />
      <Contribute />
      <Cta />
    </>
  );
}
