import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// AnimatedLoader
// - Tailwind for styling
// - GSAP for performant animations
// - Respects prefers-reduced-motion
// - Single-file React component (default export)

export default function Loader({ show = true, background = "bg-white" }) {
  const rootRef = useRef(null);
  const dotsRef = useRef([]);
  const ringRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!show) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // rotating ring
      gsap.to(ringRef.current, {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 2.6,
        ease: "power1.inOut",
        repeat: -1,
      });

      // logo subtle breathing
      gsap.to(logoRef.current, {
        scale: 1.06,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // dots stagger bounce
      gsap.fromTo(
        dotsRef.current,
        { y: 0, opacity: 0.5 },
        {
          y: -14,
          opacity: 1,
          duration: 0.55,
          ease: "power1.out",
          stagger: { each: 0.12, yoyo: true, repeat: -1 },
        }
      );

      // small wobble to whole loader for extra smoothness
      gsap.to(rootRef.current, {
        y: 4,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-50 flex items-center justify-center ${background} bg-opacity-95 backdrop-blur-sm`}
      aria-hidden={!show}
      role="status"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Rotating ring + logo */}
        <div className="relative w-28 h-28 md:w-36 md:h-36">
          <svg
            ref={ringRef}
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#g)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="66 120"
              className="opacity-95"
            />
          </svg>

          {/* Logo center (simple shape) */}
          {/* <div
            ref={logoRef}
            className="relative m-auto w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
            aria-hidden
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="opacity-95"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M12 2L2 7l10 5 10-5-10-5zm0 11l10-5v9l-10 5-10-5v-9l10 5z"
                />
              </svg>
            </div>
          </div> */}
        </div>

        {/* Text + animated dots */}
        <div className="flex items-center gap-3">
          <span className="text-sm md:text-base text-gray-600">Loading</span>
          <div className="flex items-end gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                ref={(el) => (dotsRef.current[i] = el)}
                className="block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-400"
                aria-hidden
              />
            ))}
          </div>
        </div>

        {/* Optional hint for users who prefer reduced motion */}
        <span className="sr-only">Loading — please wait</span>
      </div>
    </div>
  );
}
