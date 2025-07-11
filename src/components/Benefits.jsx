import { useEffect, useState } from "react";
import { FaTruck, FaShieldAlt, FaMedal } from "react-icons/fa";

const benefits = [
  {
    icon: <FaTruck size={60} className="text-pink-400" />,
    label: "Worldwide Shipping",
  },
  {
    icon: <FaShieldAlt size={60} className="text-purple-400" />,
    label: "Secure Checkout",
  },
  {
    icon: <FaMedal size={60} className="text-indigo-400" />,
    label: "5.0 Rating",
  },
];

export default function Benefits() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Merge top of this section with bottom of Newsletter section
  const outerStyle = {
    background: `linear-gradient(
      to bottom,         
      rgb(252, 222, 241) 0%,/* top — match bottom of previous section */
      rgba(251, 202, 230, 0.8) 25%,         /* soft pink mid tone */
      rgba(242, 211, 254, 0.7) 60%,         /* soft purple */
      rgba(245, 211, 252, 0.8) 100%         /* bottom — blend into next section */
    )`,
  };

  const innerStyle = {
    position: "relative",
    overflow: "hidden",
  };

  const watermarkStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    fontSize: "8rem",
    fontWeight: "900",
    fontFamily: "'Bodoni Moda', serif",
    color: "rgba(199, 112, 161, 0.08)",
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    zIndex: 0,
  };

  return (
    <section style={outerStyle}>
      <section style={innerStyle} className="pt-10 pb-20 mt-0 ">
        
        {/* Watermark */}
         <div className="absolute inset-0 z-0 pointer-events-none select-none flex flex-col items-start justify-center pl-20 space-y-4">
        <h1
          className="text-[210px] font-bold opacity-5 leading-none text-left ml-[30%]"
          style={{
            fontFamily: '"Bodoni Moda SC", serif',
            fontOpticalSizing: 'auto',
            fontWeight: 700,
            fontStyle: 'normal',
          }}
        >
          <span className="text-black-400">Fashion</span>
        </h1>
      </div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto px-6 md:px-10 gap-10 sm:gap-20">
          {benefits.map((b, idx) => {
            const delayOffset = idx * 100;
            const translateY = Math.max(0, 40 - (scrollY - delayOffset) * 0.15);
            const opacity = Math.min(1, (scrollY - delayOffset) / 200);

            return (
              <div
                key={idx}
                className="text-center flex-1"
                style={{
                  transform: `translateY(${translateY}px)`,
                  opacity,
                  transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
                }}
              >
                <div className="mb-2 flex justify-center">{b.icon}</div>
                <p className="font-semibold text-gray-800">{b.label}</p>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
