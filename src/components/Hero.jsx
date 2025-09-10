import React, { useState, useEffect } from "react";
import { ChevronDown, Sparkles, Heart } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #ffd700, #ff6b6b, #4ecdc4, transparent 70%)`,
        }}
      />

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-10 blur-3xl animate-pulse delay-2000 -translate-x-1/2 -translate-y-1/2" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className={`transform transition-all duration-2000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {/* Sparkle Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-yellow-400 animate-spin slow-spin" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="w-16 h-16 text-yellow-400 opacity-75" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            You're Invited
          </h1>

          {/* Subtitle */}
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-wide">
            A Farewell to Remember
          </h2>

          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-64"></div>
            <Heart className="mx-4 w-6 h-6 text-pink-400 animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-64"></div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join us for an unforgettable evening celebrating memories,
            friendships, and new beginnings as we bid farewell in style.
          </p>

          {/* CTA Button */}
          <button className="group relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-400/50 focus:outline-none focus:ring-4 focus:ring-yellow-400/50">
            <span className="relative z-10">Create Your Invitation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white opacity-75" />
      </div>

      {/* Custom CSS for slow spin */}
      <style jsx>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .slow-spin {
          animation: slow-spin 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
