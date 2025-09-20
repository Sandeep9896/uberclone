import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loading() {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Animate text scaling & opacity
    tl.fromTo(
      textRef.current,
      { scale: 0.8, opacity: 0.5 },
      { scale: 1.2, opacity: 1, duration: 1.2, ease: "power2.inOut" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 h-[60vh] top-[10vh] flex items-center justify-center bg-black text-white z-50"
    >
      <h1 ref={textRef} className="text-3xl font-bold tracking-widest">
        Loading...
      </h1>
    </div>
  );
}
