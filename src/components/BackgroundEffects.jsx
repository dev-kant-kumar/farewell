import React, { useEffect, useState } from "react";

const BackgroundEffects = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #ffd700 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #ff6b6b 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #4ecdc4 0%, transparent 50%)
            `,
            transform: `translateY(${scrollY * 0.1}px) rotate(${
              scrollY * 0.02
            }deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div
          className="absolute w-96 h-96 rounded-full border border-white/10 animate-float-slow"
          style={{
            top: "10%",
            left: "10%",
            transform: `translateY(${scrollY * 0.05}px)`,
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full border border-yellow-400/20 animate-float-medium"
          style={{
            top: "50%",
            right: "10%",
            transform: `translateY(${scrollY * 0.03}px)`,
            animation: "float-medium 15s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full border border-pink-400/15 animate-float-fast"
          style={{
            bottom: "10%",
            left: "30%",
            transform: `translateY(${scrollY * 0.07}px)`,
            animation: "float-fast 25s ease-in-out infinite",
          }}
        />

        {/* Rotating geometric patterns */}
        <div
          className="absolute w-32 h-32 border-2 border-blue-400/30 rotate-45 animate-spin-slow"
          style={{
            top: "30%",
            left: "70%",
            transform: `rotate(${45 + scrollY * 0.1}deg)`,
            animation: "spin 30s linear infinite",
          }}
        />
        <div
          className="absolute w-24 h-24 border border-purple-400/20 animate-pulse"
          style={{
            top: "70%",
            right: "20%",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      </div>

      {/* Animated mesh pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.01}px)`,
        }}
      />

      {/* Glowing orbs with parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            top: "20%",
            left: "5%",
            transform: `translate(${scrollY * 0.03}px, ${scrollY * 0.05}px)`,
          }}
        />
        <div
          className="absolute w-48 h-48 bg-pink-500 rounded-full blur-3xl opacity-15 animate-pulse"
          style={{
            top: "60%",
            right: "5%",
            animationDelay: "1s",
            transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.04}px)`,
          }}
        />
        <div
          className="absolute w-56 h-56 bg-cyan-400 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{
            bottom: "20%",
            left: "50%",
            animationDelay: "2s",
            transform: `translate(${scrollY * 0.01}px, ${-scrollY * 0.03}px)`,
          }}
        />
      </div>

      {/* Dynamic wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
              <stop offset="100%" stopColor="rgba(255,215,0,0.1)" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#wave-gradient)"
            style={{
              transform: `translateX(${scrollY * 0.1}px)`,
              animation: "wave 10s ease-in-out infinite alternate",
            }}
          />
          <path
            d="M0,80 C400,40 800,120 1200,80 L1200,120 L0,120 Z"
            fill="rgba(255,107,107,0.2)"
            style={{
              transform: `translateX(${-scrollY * 0.05}px)`,
              animation: "wave 15s ease-in-out infinite alternate-reverse",
            }}
          />
        </svg>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(90deg);
          }
          50% {
            transform: translateY(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(-15px) rotate(270deg);
          }
        }
        @keyframes wave {
          0% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffects;
