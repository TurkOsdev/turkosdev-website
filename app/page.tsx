import { Hero } from "@/components/sections/hero";
import { Topics } from "@/components/sections/topics";

export default function HomePage() {
  return (
    <>
      <Hero />
      <hr className="hairline" />
      <Topics />
    </>
  );
}
