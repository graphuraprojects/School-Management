import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/404" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        {/* OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200">
            <h3 className="font-semibold">Pending Admissions</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200">
            <h3 className="font-semibold">Total Students</h3>
            <p className="text-3xl font-bold mt-2">850</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200">
            <h3 className="font-semibold">Products in Stock</h3>
            <p className="text-3xl font-bold mt-2">24</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200">
            <h3 className="font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold mt-2">$15,000</p>
          </div>
        </div>

        {/* RECENT ADMISSIONS + LOW STOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ADMISSIONS TABLE */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-bold mb-4">Recent Admissions</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "James Carter",
                    date: "2023-10-26",
                    status: "Pending",
                  },
                  {
                    name: "Sophie Moore",
                    date: "2023-10-25",
                    status: "Approved",
                  },
                  {
                    name: "William Hill",
                    date: "2023-10-24",
                    status: "Rejected",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b text-sm">
                    <td className="p-2">{row.name}</td>
                    <td className="p-2">{row.date}</td>
                    <td className="p-2">
                      <span className="px-3 py-1 rounded-full bg-yellow-200 text-xs">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-2 text-blue-600 cursor-pointer">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* LOW STOCK PRODUCTS */}
          <div className="bg-white p-5 rounded-xl shadow flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4">Low Stock Products</h2>

            <ul className="space-y-4 mb-4">
              <li className="flex justify-between">
                <span>Sports Backpack</span>
                <span className="text-red-600">8 left</span>
              </li>
              <li className="flex justify-between">
                <span>School Hoodie</span>
                <span className="text-red-600">2 left</span>
              </li>
            </ul>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-auto"
              onClick={() => {
                setShowAddProduct(true);
                setTimeout(() => {
                  document
                    .getElementById("addProductSection")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 200);
              }}
            >
              Add Product
            </button>
          </div>
        </div>

        {/* ADD PRODUCT FORM */}
        {showAddProduct && (
          <div
            id="addProductSection"
            className="bg-white shadow-lg p-6 rounded-2xl mt-10 w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Add New Product
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Title"
                className="border p-3 rounded-lg w-full"
                required
              />

              <input
                type="number"
                placeholder="Price"
                className="border p-3 rounded-lg w-full"
                required
              />

              <input
                type="number"
                placeholder="Quantity"
                className="border p-3 rounded-lg w-full"
                required
              />

              <select className="border p-3 rounded-lg w-full" required>
                <option value="">Select Category</option>
                <option>Uniforms</option>
                <option>Stationery</option>
                <option>Bags</option>
                <option>Books</option>
                <option>Accessories</option>
              </select>

              <textarea
                placeholder="Description"
                className="border p-3 rounded-lg w-full md:col-span-2"
                rows="3"
                required
              ></textarea>

              {/* Image Upload */}
              <label
                htmlFor="productImg"
                className="border-dashed border-2 border-gray-400 p-6 rounded-xl cursor-pointer flex flex-col items-center gap-2 md:col-span-2"
              >
                <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
                <p>Click to upload product image</p>
                <input type="file" id="productImg" className="hidden" />
              </label>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg w-full md:col-span-2"
              >
                Submit Product
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
