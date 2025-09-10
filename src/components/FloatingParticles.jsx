import React, { useEffect, useState } from "react";

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: ["#ffd700", "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"][
        Math.floor(Math.random() * 6)
      ],
    }));
    setParticles(initialParticles);

    // Mouse move handler for magnetic effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Animation loop
    let animationId;
    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Boundary collision
          if (newX < 0 || newX > window.innerWidth) {
            particle.speedX *= -1;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }
          if (newY < 0 || newY > window.innerHeight) {
            particle.speedY *= -1;
            newY = Math.max(0, Math.min(window.innerHeight, newY));
          }

          // Magnetic effect towards mouse (subtle)
          const dx = mousePosition.x - newX;
          const dy = mousePosition.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const force = ((150 - distance) / 150) * 0.02;
            newX += dx * force;
            newY += dy * force;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-100 ease-out"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
