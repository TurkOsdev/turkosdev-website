"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GradientWaves = dynamic(() => import("@/components/gradient-waves"), {
  ssr: false,
});

/**
 * Ana sayfanın arkaplanındaki dalga alanı. WebGL sahnesi yalnızca istemcide ve
 * kullanıcı hareket azaltma tercihini açmadıysa yüklenir; aksi halde geriye
 * dönük olarak statik bir degrade gösterilir.
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
    return (
      <div aria-hidden className="brand-glow absolute inset-0 rotate-180 opacity-50" />
    );
  }

  return (
    <div aria-hidden className="absolute inset-0">
      <GradientWaves
        horizonColor="#120306"
        waveColor="#1c060a"
        crestColor="#e30a17"
        speed={0.28}
        amplitude={2.2}
        waveScale={0.62}
        waveRatio={0.9}
        swell={32}
        turbulence={18}
        tilt={1.11}
        zoom={1}
        height={5.5}
        fogDepth={13}
        detail="medium"
        brightness={0.85}
        opacity={0.9}
        mouseInteraction
        parallaxStrength={0.45}
        grain
        grainIntensity={0.045}
      />
    </div>
  );
}
