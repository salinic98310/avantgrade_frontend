import { useEffect, useState } from "react";

export default function Footer() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      title: "About",
      content: "We are a forward-thinking company providing top-notch services tailored to your needs.",
    },
    {
      title: "Address",
      content: "Esplanade, Dharmatala, Kolkata 700087",
    },
  ];

  const gradientStyle = {
    background: `linear-gradient(
      to bottom,
      rgba(240, 207, 254, 0.7) 0%,
      rgba(245, 216, 253, 0.8) 50%,
      rgba(252, 199, 221, 0.9) 90%,
      rgb(247, 195, 203) 100%
    )`,
  };

  return (
    <footer
      className="text-center text-sm py-10 border-t mt-0"
      style={gradientStyle}
    >
      <div className="flex flex-col md:flex-row justify-around text-left py-8 max-w-6xl mx-auto px-6 gap-12">
        {items.map((item, idx) => {
          const delayOffset = idx * 100;
          const translateY = Math.max(0, 40 - (scrollY - delayOffset) * 0.15);
          const opacity = Math.min(1, (scrollY - delayOffset) / 200);

          return (
            <div
              key={idx}
              className="flex-1"
              style={{
                transform: `translateY(${translateY}px)`,
                opacity,
                transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
              }}
            >
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-700">{item.content}</p>
            </div>
          );
        })}

        {/* Form with bordered fields only */}
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2">Contact Us</h4>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-500 placeholder:text-gray-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-500 placeholder:text-gray-600"
            />
            <textarea
              rows="3"
              placeholder="Message"
              className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-500 placeholder:text-gray-600 resize-none"
            />
            <button
              type="submit"
              className="text-sm text-white bg-pink-500 hover:bg-pink-600 px-4 py-1 rounded transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <p className="mt-8 text-gray-600">© 2025. All Rights Reserved.</p>
    </footer>
  );
}
