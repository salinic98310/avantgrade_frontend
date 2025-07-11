import { useEffect, useState } from "react";

const products = [
  { id: 1, img: "/images/product1.jpg", name: "Silk Jacket", price: "$120" },
  { id: 2, img: "/images/product2.jpg", name: "Modern Blazer", price: "$98" },
  { id: 3, img: "/images/product3.jpg", name: "Boho Dress", price: "$160" },
  { id: 4, img: "/images/product4.jpg", name: "Leather Pants", price: "$110" },
];

export default function NewArrivals() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animations
  const sectionTranslateY = Math.max(-20, 60 - scrollY * 0.1);
  const sectionOpacity = Math.min(1, scrollY / 400);

  const trendingTranslateY = Math.max(0, 30 - scrollY * 0.1);
  const trendingOpacity = Math.min(1, scrollY / 200);

  const titleTranslateY = Math.max(0, 60 - scrollY * 0.15);
  const titleOpacity = Math.min(1, (scrollY - 100) / 200);

  return (
    <section
      id="new-arrivals"
      className="text-center px-6 sm:px-10 py-16 pt-10"
      style={{
        background: `linear-gradient(
          to bottom,
        rgb(246, 232, 252) 0%,
rgb(228, 208, 231) 30%,
rgb(255, 230, 236) 70%,
         rgb(242, 233, 253)  100%
        )`,
        transform: `translateY(${sectionTranslateY}px)`,
        opacity: sectionOpacity,
        transition: "transform 0.7s ease-out, opacity 0.7s ease-out",
      }}
    >
      <p
        className="text-pink-500 font-semibold mb-2 text-sm sm:text-base"
        style={{
          opacity: trendingOpacity,
          transform: `translateY(${trendingTranslateY}px)`,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        Top Trending
      </p>
      <h2
        className="text-3xl sm:text-4xl font-bold mb-20 text-gray-900"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        New Arrivals
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p, i) => {
          const baseTranslate =
            scrollY > 100 ? (i % 2 === 0 ? scrollY * 0.03 : -scrollY * 0.03) : 40;
          const cardOpacity = Math.min(1, (scrollY - i * 50) / 300);

          return (
            <div
              key={p.id}
              className="group"
              style={{
                transform: `translateY(${baseTranslate}px)`,
                opacity: cardOpacity,
                transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
              }}
            >
              <div className="relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transform transition-transform duration-500 hover:scale-105">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  style={{
                    transform: `scale(${1 + Math.min(scrollY / 3000, 0.05)})`,
                    transition: "transform 0.6s ease-out",
                  }}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    {p.name}
                  </span>
                  <span className="text-white text-md">{p.price}</span>
                </div>
              </div>

              <div
                className="mt-2"
                style={{
                  transform: `translateY(${scrollY > 100 ? 0 : 10}px)`,
                  opacity: Math.min(1, scrollY / 400),
                  transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
                }}
              >
                <p className="text-gray-800 font-semibold text-sm sm:text-base">
                  {p.name}
                </p>
                <p className="text-gray-500 text-sm">{p.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
