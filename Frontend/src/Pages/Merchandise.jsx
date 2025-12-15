import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../CartFunction";

const Merchandise = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${apiUrl}/merchandise`)
      .then((res) => {
        setProducts(res.data);
        console.log("Type =>", Array.isArray(res.data));
      })
      .catch((err) => {
        console.error("Error fetching merchandise data:", err);
      });
  }, []);
  return (
    <div className="bg-[#f6f7f8]">
      {/* store header */}
      <section className="p-4">
        <div className="relative rounded-xl shadow-xl overflow-hidden h-[200px] sm:h-[280px] md:h-[300px]">
          <img
            src="https://res.cloudinary.com/drq2a0262/image/upload/v1764487169/screen_cp2zfl.png"
            alt="store-banner"
          />
          <div className="absolute inset-0 bg-black/50">
            <div className="absolute inset-0 flex flex-col justify-center text-white px-4">
              <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <i className="fa-solid fa-store"></i> School Store
              </h1>
              <p className="font-semibold mt-2 sm:text-lg md:text-xl lg:text-2xl">
                Everything you need for a successful school year.
              </p>
              <ul className="gap-10 lg:gap-20 hidden sm:flex mt-4">
                <li className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
                  <i className="fa-solid fa-shirt"></i> Spirit Wears
                </li>
                <li className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
                  <i className="fa-solid fa-pencil"></i> School Supplies
                </li>
                <li className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
                  <i className="fa-solid fa-book-open"></i> Books & Textbooks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* category filter */}
      <section className="category-filter">
        <div className="w-full border-b border-gray-300 py-3">
          <nav className="categories overflow-x-auto scrollbar-hide py-2">
            <ul className="flex items-center min-w-max gap-4 md:gap-4 lg:gap-6 px-4 sm:justify-center">
              {[
                "All",
                "Uniforms",
                "Stationery",
                "Bags",
                "Books",
                "Accessories",
              ].map((category) => (
                <li
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer font-semibold py-2 px-5 rounded-3xl border border-gray-300 transition-colors duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-[#57699b]"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* products here */}
      <section className="products flex justify-center">
        <div className="px-4 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl">
          {products.length === 0 ? (
            <p className="text-center mt-10">No products available.</p>
          ) : (
            products
              .filter(
                (product) =>
                  selectedCategory.toLowerCase() === "all" ||
                  selectedCategory.toLowerCase() ===
                    product.category.toLowerCase()
              )
              .map((item) => (
                <div
                  key={item._id}
                  className="group relative bg-white rounded-2xl shadow-md p-4 overflow-hidden
             transition-all duration-300 cursor-pointer flex flex-col
             hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
                >
                  <div className="w-full h-48 sm:h-56 lg:h-60 mb-3 overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl
                 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <h4
                    className="md:text-lg font-bold text-gray-800 mb-1
                 transition-colors duration-300 group-hover:text-blue-600"
                  >
                    {item.title.length > 25
                      ? item.title.slice(0, 25) + "..."
                      : item.title}
                  </h4>

                  <div className="mt-auto space-y-1">
                    <p className="text-gray-600 font-semibold text-md md:text-lg">
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold
                 shadow-md transition-all duration-300
                 hover:shadow-xl hover:bg-blue-700 hover:-translate-y-1
                 active:scale-95 cursor-pointer"
                 disabled={item.quantity === 0}
                    >
                      Add to Cart
                    </button>
                    <span className={`${item.quantity === 0 ? "block" : "hidden"} absolute top-5 left-5 rounded-2xl px-2 py-1 bg-[#ff0000b5] text-white font-semibold`}>Out of Stock</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Merchandise;
