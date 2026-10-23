import React from 'react';

export default function SnowEffect() {
  // Generamos una cantidad moderada de copos (ej. 35) para que se vea bien sin recargar el DOM
  const snowflakes = Array.from({ length: 35 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {snowflakes.map((_, i) => {
        // Valores aleatorios para que cada copo caiga a diferente velocidad y posición
        const randomLeft = Math.random() * 100;
        const randomAnimationDuration = 5 + Math.random() * 7; // Entre 5s y 12s
        const randomDelay = Math.random() * 5; // Retraso aleatorio
        const randomSize = 3 + Math.random() * 5; // Entre 3px y 8px

        return (
          <span
            key={i}
            className="absolute bg-white rounded-full opacity-80 animate-fall"
            style={{
              left: `${randomLeft}%`,
              top: `-10px`,
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              animationDuration: `${randomAnimationDuration}s`,
              animationDelay: `${randomDelay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
            }}
          />
        );
      })}

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(15px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(105vh) translateX(-15px);
            opacity: 0.1;
          }
        }
        .animate-fall {
          animation-name: fall;
        }
      `}</style>
    </div>
  );
}