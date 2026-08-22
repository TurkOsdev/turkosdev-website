"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GradientWaves = dynamic(() => import("@/components/gradient-waves"), {
  ssr: false,
});

/**
 * Ana sayfadaki ufuk şeridi. WebGL sahnesi yalnızca istemcide ve kullanıcı
 * hareket azaltma tercihini açmadıysa yüklenir.
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
    return <div aria-hidden className="absolute inset-0 bg-[#1a050a]" />;
  }

  return (
    <div aria-hidden className="absolute inset-0">
      <GradientWaves
        horizonColor="#0e0304"
        waveColor="#170406"
        crestColor="#7a0c14"
        speed={0.16}
        amplitude={2.6}
        waveScale={0.78}
        waveRatio={0.9}
        swell={14}
        turbulence={9}
        tilt={1.05}
        zoom={1}
        height={5}
        fogDepth={34}
        detail="medium"
        brightness={0.78}
        opacity={1}
        mouseInteraction={false}
        parallaxStrength={0}
        grain
        grainIntensity={0.035}
      />
    </div>
  );
}
