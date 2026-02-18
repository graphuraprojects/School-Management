import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../CartFunction";

const Merchandise = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    axios
      .get(`$/api/merchandise`)
      .then((res) => {
        setProducts(res.data);
        console.log("Type =>", Array.isArray(res.data));
      })
      .catch((err) => {
        console.error("Error fetching merchandise data:", err);
      });
  }, []);

  // Filter products by category
  const filteredProducts = products.filter(
    (product) =>
      selectedCategory.toLowerCase() === "all" ||
      selectedCategory.toLowerCase() === product.category.toLowerCase()
  );

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* store header with image and gradient overlay */}
      <section className="">
        <div className="relative overflow-hidden h-[200px] sm:h-[280px] md:h-[300px]">
          <img
            src="https://res.cloudinary.com/drq2a0262/image/upload/v1764487169/screen_cp2zfl.png"
            alt="store-banner"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(12, 48, 49, 0.85) 0%, rgba(15, 55, 48, 0.85) 50%, rgba(26, 71, 45, 0.85) 100%)"
            }}
          >
            <div className="absolute animate-fade-up inset-0 flex flex-col justify-center text-white px-8 pt-15">
              <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <i className="fa-solid fa-store text-[#6fd513] mr-3"></i> School Store
              </h1>
              <p className="font-semibold mt-2 sm:text-lg md:text-xl lg:text-2xl text-gray-200">
                Everything you need for a successful school year.
              </p>
              <ul className="gap-10 lg:gap-20 hidden sm:flex mt-4">
                <li className="text-white text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2">
                  <i className="fa-solid fa-shirt text-[#6fd513]"></i> Spirit Wears
                </li>
                <li className="text-white text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2">
                  <i className="fa-solid fa-pencil text-[#6fd513]"></i> School Supplies
                </li>
                <li className="text-white text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2">
                  <i className="fa-solid fa-book-open text-[#6fd513]"></i> Books & Textbooks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* category filter */}
      <section className="category-filter">
        <div className="w-full border-b border-gray-200 py-3 bg-white">
          <nav className="categories overflow-x-auto scrollbar-hide py-2">
            <ul className="flex items-center min-w-max gap-4 md:gap-4 lg:gap-6 px-4 sm:justify-center">
              {[
                { name: "All", icon: "fa-grid-2" },
                { name: "Uniforms", icon: "fa-shirt" },
                { name: "Stationery", icon: "fa-pencil" },
                { name: "Bags", icon: "fa-bag-shopping" },
                { name: "Books", icon: "fa-book" },
                { name: "Accessories", icon: "fa-gift" },
              ].map((category) => (
                <li
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`cursor-pointer font-semibold py-2 px-5 rounded-3xl border-2 transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? "bg-[#6fd513] text-white border-[#6fd513]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#6fd513] hover:text-[#6fd513]"
                  }`}
                >
                  <i className={`fa-solid ${category.icon}`}></i>
                  {category.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* products here */}
      <section className="products flex justify-center pb-8">
        <div className="px-4 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl w-full">
          {products.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <i className="fa-solid fa-box-open text-6xl text-gray-300 mb-4"></i>
              <p className="text-center text-gray-600 text-lg font-semibold">
                No products available.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <i className="fa-solid fa-filter text-6xl text-gray-300 mb-4"></i>
              <p className="text-center text-gray-600 text-lg font-semibold mb-2">
                No products found in this category.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-[#6fd513] hover:text-[#53a110] font-semibold mt-2 flex items-center gap-2"
              >
                <i className="fa-solid fa-arrow-left"></i>
                View All Products
              </button>
            </div>
          ) : (
            currentProducts.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white rounded-2xl border-2 border-gray-100 p-4 overflow-hidden
             transition-all duration-300 cursor-pointer flex flex-col
             hover:border-[#6fd513] hover:shadow-lg"
              >
                {item.quantity === 0 && (
                  <span className="absolute top-3 left-3 z-10 rounded-xl px-2 py-1 bg-red-500 text-white text-xs font-semibold flex items-center gap-1">
                    <i className="fa-solid fa-ban"></i>
                    Out of Stock
                  </span>
                )}

                <div className="w-full h-48 sm:h-56 lg:h-60 mb-3 overflow-hidden rounded-xl border border-gray-100 group-hover:border-[#6fd513] transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl
                 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h4
                  className="md:text-lg font-bold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]
                 transition-colors duration-300 group-hover:text-[#6fd513]"
                >
                  {item.title}
                </h4>

                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-indian-rupee-sign text-[#6fd513]"></i>
                    <p className="text-gray-800 font-semibold text-md md:text-lg">
                      {item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    disabled={item.quantity === 0}
                    className={`w-full py-2 rounded-lg font-semibold
                 transition-all duration-300
                 hover:-translate-y-1
                 active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                   item.quantity === 0
                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                     : "bg-[#6fd513] text-white hover:bg-[#53a110]"
                 }`}
                  >
                    {item.quantity === 0 ? (
                      <>
                        <i className="fa-solid fa-ban"></i>
                        <span>Out of Stock</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-cart-plus"></i>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <section className="flex justify-center items-center gap-2 py-6 pb-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#6fd513] text-white hover:bg-[#53a110]"
            }`}
          >
            <i className="fa-solid fa-chevron-left"></i>
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? "bg-[#6fd513] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-[#6fd513] hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="text-gray-400">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#6fd513] text-white hover:bg-[#53a110]"
            }`}
          >
            Next
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </section>
      )}

      {/* Page info */}
      {filteredProducts.length > 0 && (
        <div className="text-center text-gray-600 pb-4 text-sm">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
        </div>
      )}
    </div>
  );
};

export default Merchandise;
