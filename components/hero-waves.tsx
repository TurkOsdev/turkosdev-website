"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GradientWaves = dynamic(() => import("@/components/gradient-waves"), {
  ssr: false,
});

/**
 * Ana sayfa hero'sunun dalga alanı. WebGL sahnesi yalnızca istemcide ve
 * kullanıcı hareket azaltma tercihini açmadıysa yüklenir.
 */
export function HeroWaves() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!media.matches);

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (!enabled) {
    return <div aria-hidden className="absolute inset-0 bg-[#2d151a]" />;
  }

  return (
    <div aria-hidden className="absolute inset-0">
      <GradientWaves
        horizonColor="#241a20"
        waveColor="#38101a"
        crestColor="#a8151f"
        speed={0.2}
        amplitude={2.9}
        waveScale={0.72}
        waveRatio={0.88}
        swell={26}
        turbulence={14}
        tilt={1.12}
        zoom={1}
        height={5.5}
        fogDepth={22}
        detail="medium"
        brightness={0.82}
        opacity={1}
        mouseInteraction
        parallaxStrength={0.35}
        grain
        grainIntensity={0.04}
      />
    </div>
  );
}
