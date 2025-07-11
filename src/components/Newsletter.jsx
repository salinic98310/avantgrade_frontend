import { useEffect, useState, useRef } from "react";

export default function Newsletter() {
  const ref = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visible =
        1 -
        Math.min(
          Math.max(rect.top / (windowHeight - rect.height / 2), 0),
          1
        );

      setScrollProgress(visible);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(scrollProgress);

  const containerStyle = {
    opacity: easedProgress,
    transform: `translateY(${(1 - easedProgress) * 30}px)`,
    transition: "opacity 0.3s, transform 0.3s",
    background: `linear-gradient(
      to bottom,
      rgb(250, 233, 252) 0%,
      rgba(245, 207, 249, 0.8) 20%,
      rgb(250, 221, 237) 80%,
      rgb(253, 222, 241) 100%
    )`,
  };

  const textStyle = (delay = 0) => ({
    opacity: easedProgress,
    transform: `translateY(${(1 - easedProgress) * 20}px)`,
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
  });

  const pulseScaleStyle = {
    animation: "pulseScale 3s ease-in-out infinite",
  };

  const pulseFadeStyle = {
    animation: "pulseFade 4s ease-in-out infinite",
  };

  const buttonPulseStyle = {
    animation: "buttonPulse 3s ease-in-out infinite",
  };

  return (
    <>
      {/* Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz@6..96&display=swap"
        rel="stylesheet"
      />

      {/* Animations */}
      <style>{`
        @keyframes pulseScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        @keyframes buttonPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(40, 186, 94, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 16px rgba(52, 188, 102, 0.9); }
        }
      `}</style>

      <section id="newsletter"
        ref={ref}
        className="relative text-center py-30 px-4 md:px-0 max-w-8xl mx-auto backdrop-blur-md overflow-hidden"
        style={containerStyle}
      >
        {/* Watermark */}
         <div className="absolute inset-0 z-0 pointer-events-none select-none flex flex-col items-start justify-center pl-20 space-y-4">
        <h1
          className="text-[200px] font-bold opacity-20 leading-none text-left ml-[5%]"
          style={{
            fontFamily: '"Bodoni Moda SC", serif',
            fontOpticalSizing: 'auto',
            fontWeight: 700,
            fontStyle: 'normal',
          }}
        >
          <span className="text-pink-400">AvantGarde</span>
        </h1>
      </div>

        {/* Main Content */}
        <div className="relative z-10">
          <p
            className="text-pink-700 font-semibold mb-2"
            style={{ ...textStyle(100), ...pulseScaleStyle }}
          >
            Sign Up for
          </p>

          <h2
            className="text-2xl md:text-3xl font-bold mb-4 leading-snug"
            style={{ ...textStyle(200), ...pulseScaleStyle }}
          >
            News and Offers
          </h2>

          <p
            className="mb-6 text-gray-800 max-w-xl mx-auto"
            style={{ ...textStyle(300), ...pulseFadeStyle }}
          >
            Join our family and be the first to know about product launches, events,
            and so much more.
          </p>

          <form
            className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
            style={textStyle(400)}
          >
            <input
              type="email"
              placeholder="Your Email"
              className="border-b-2 border-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 px-2 py-2 w-full max-w-xs md:w-72 rounded-sm transition duration-300"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded w-full max-w-xs md:w-auto transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              style={buttonPulseStyle}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
