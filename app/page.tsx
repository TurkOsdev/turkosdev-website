import { Community } from "@/components/sections/community";
import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { TopicsPreview } from "@/components/sections/topics-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Community />
      <TopicsPreview />
      <Cta />
    </>
  );
}
