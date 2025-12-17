import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [admissions, setAdmissions] = useState([]);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQtyModalOpen, setIsQtyModalOpen] = useState(false);
  const [qtyProductId, setQtyProductId] = useState(null);
  const [addQty, setAddQty] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState("");

  const [cart, setCart] = useState([]);
  const [totalQty, setTotalQty] = useState(0);

  const navigate = useNavigate();

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // Not logged in → login
    if (!user || !token) {
      navigate("/login");
      return;
    }

    // Logged in but NOT admin → 404
    if (user.role !== "admin") {
      navigate("/404");
      return;
    }

    // Admin → stay on dashboard
  }, [navigate]);

  // ---------- ADD PRODUCT ----------
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("quantity", newProduct.quantity);
      formData.append("category", newProduct.category);
      formData.append("image", newProduct.image);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/merchandise`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Product added successfully!");
      setIsAddProductOpen(false);

      setCart((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      toast.error("Error adding product");
    }
  };

  // ---------- FETCH PRODUCTS ----------
  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/merchandise`
        );
        const items = res.data || [];

        setCart(items);

        const qty = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setTotalQty(qty);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchMerch();
  }, []);

  // Fetch user
  const userObj = JSON.parse(localStorage.getItem("user"));

  // ---------- FETCH ADMISSIONS ----------
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admission`)
      .then((res) => setAdmissions(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleView = (id) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admission/${id}`)
      .then((res) => {
        setSelectedAdmission(res.data.data);
        setIsModalOpen(true);
      })
      .catch((err) => console.error(err));
  };
  // ---------- FETCH USER BY ID ----------
  const fetchUserById = async () => {
    if (!searchUserId.trim()) return;

    setUserLoading(true);
    setSearchedUser(null);
    setUserError("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/get-user/${searchUserId}`
      );
      setSearchedUser(res.data.user);
    } catch (err) {
      setUserError("User not found");
    } finally {
      setUserLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedAdmission(null);
    setIsModalOpen(false);
  };

  //handle products quantity
  const handleUpdateQuantity = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/merchandise/${qtyProductId}`,
        { quantity: Number(addQty) }
      );

      toast.success("Quantity updated!");
      setIsQtyModalOpen(false);
      setAddQty("");
      // Update local cart state instantly
      setCart((prev) =>
        prev.map((item) =>
          item._id === qtyProductId
            ? { ...item, quantity: item.quantity + Number(addQty) }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  // ---------------------------------------------------------
  // ------------------- DASHBOARD PAGE ----------------------
  // ---------------------------------------------------------
  const DashboardPage = () => (
    <div className="p-10 flex flex-col gap-6">
      {/* TOP BAR SWITCHER */}
      <div className="flex justify-between items-center">
        <p className="text-[#111418] text-4xl font-black">
          Welcome back, {userObj.username}!
        </p>
      </div>

      <div
        className="flex gap-3 mt-2 overflow-x-auto
    whitespace-nowrap
    scrollbar-hide
    pb-2"
      >
        <button
          onClick={() => setCurrentPage("dashboard")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "dashboard"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentPage("products")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "products"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setCurrentPage("orders")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "orders"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setCurrentPage("get-user")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "get-user"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Get User
        </button>
        <button
          onClick={() => setCurrentPage("create-admin")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "create-admin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Create Admin
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", count: "1850+" },
          { title: "Total Activities", count: "40+" },
          { title: "Products in Stock", count: totalQty },
          { title: "Total Revenue", count: "₹1,50,000+" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[#dbe0e6] items-center"
          >
            <p className="text-black font-bold">{stat.title}</p>
            <p className="text-blue-500 text-3xl font-bold">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Admissions */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-blue-200 p-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">
          Recent Admissions
        </h2>

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-100 text-blue-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 border-b">Student Name</th>
                <th className="px-6 py-3 border-b">Parent Name</th>
                <th className="px-6 py-3 border-b">Phone</th>
                <th className="px-6 py-3 border-b text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((row) => (
                <tr key={row._id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-medium text-blue-900">
                    {row.fullName}
                  </td>
                  <td className="px-6 py-4 text-blue-800">{row.parentName}</td>
                  <td className="px-6 py-4 text-blue-700">{row.parentPhone}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleView(row._id)}
                      className="px-4 py-1 bg-blue-600 text-white rounded-lg cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedAdmission && (
        <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-6 border-4 border-blue-400 overflow-y-auto max-h-screen relative mt-50">
            <button
              className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              {selectedAdmission.studentPhoto && (
                <img
                  src={selectedAdmission.studentPhoto}
                  alt="Student"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-300"
                />
              )}
              <h2 className="text-2xl font-bold text-blue-700">
                {selectedAdmission.fullName}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Personal Info
                </h3>
                <p>
                  <strong>DOB:</strong> {selectedAdmission.dateOfBirth}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedAdmission.gender}
                </p>
                <p>
                  <strong>Nationality:</strong> {selectedAdmission.nationality}
                </p>
                <p>
                  <strong>Proposed Grade:</strong>{" "}
                  {selectedAdmission.proposedGrade}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Parent Info
                </h3>
                <p>
                  <strong>Name:</strong> {selectedAdmission.parentName}
                </p>
                <p>
                  <strong>Relationship:</strong>{" "}
                  {selectedAdmission.relationship}
                </p>
                <p>
                  <strong>Email:</strong> {selectedAdmission.parentEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedAdmission.parentPhone}
                </p>
                <p>
                  <strong>WhatsApp:</strong> {selectedAdmission.parentWhatsApp}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Emergency Contact
                </h3>
                <p>
                  <strong>Name:</strong> {selectedAdmission.emergencyName}
                </p>
                <p>
                  <strong>Relationship:</strong>{" "}
                  {selectedAdmission.emergencyRelationship}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedAdmission.emergencyPhone}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Academic Info
                </h3>
                <p>
                  <strong>Previous School:</strong>{" "}
                  {selectedAdmission.previousSchool}
                </p>
                <p>
                  <strong>Previous Grade:</strong>{" "}
                  {selectedAdmission.previousGrade}
                </p>
                <p>
                  <strong>Notes:</strong>{" "}
                  {selectedAdmission.additionalNotes || "N/A"}
                </p>
              </div>
            </div>

            {/* Files */}
            <div className="mt-6 flex gap-6 flex-wrap">
              {selectedAdmission.studentPhoto && (
                <a
                  href={selectedAdmission.studentPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Student Photo
                </a>
              )}
              {selectedAdmission.birthCertificate && (
                <a
                  href={selectedAdmission.birthCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Birth Certificate
                </a>
              )}
              {selectedAdmission.previousMarksheets && (
                <a
                  href={selectedAdmission.previousMarksheets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Previous Marksheets
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ---------------------------------------------------------
  // ------------------- PRODUCTS PAGE -----------------------
  // ---------------------------------------------------------
  const ProductsPage = () => (
    <div className="p-10 flex flex-col gap-6">
      {/* TOP BAR SWITCHER */}
      <div className="flex justify-between items-center">
        <p className="text-[#111418] text-4xl font-black">Products</p>

        <button
          onClick={() => setIsAddProductOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      <div
        className="flex gap-3 mt-2 overflow-x-auto
    whitespace-nowrap
    scrollbar-hide
    pb-2"
      >
        <button
          onClick={() => setCurrentPage("dashboard")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "dashboard"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentPage("products")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "products"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setCurrentPage("orders")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "orders"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setCurrentPage("get-user")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "get-user"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Get User
        </button>
        <button
          onClick={() => setCurrentPage("create-admin")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "create-admin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Create Admin
        </button>
      </div>

      {/* Description */}
      <p className="text-[#617589] text-sm">
        Manage all merchandise items available in the school store.
      </p>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <div className="max-h-[450px] overflow-y-auto">
          <table className="min-w-[700px] w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-700 sticky top-0">
                <th className="px-4 py-3 border-b">Image</th>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Category</th>
                <th className="px-4 py-3 border-b">Price</th>
                <th className="px-4 py-3 border-b">Stock</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="hover:bg-blue-50">
                  <td className="px-4 py-3 border-b">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded object-cover shadow-md"
                    />
                  </td>

                  <td className="px-4 py-3 border-b font-medium">
                    {item.title}
                  </td>

                  <td className="px-4 py-3 border-b text-[#617589]">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 border-b font-semibold text-blue-600">
                    ₹{item.price}
                  </td>

                  <td className="px-4 py-3 border-b">{item.quantity}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                      onClick={() => {
                        setQtyProductId(item._id);
                        setIsQtyModalOpen(true);
                      }}
                    >
                      Add Qty
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {cart.length === 0 && (
            <p className="text-center py-4 text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );

  // orders page
  const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all orders
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching orders:", err);
      }
    };

    useEffect(() => {
      fetchOrders();
    }, []);

    // Update order status
    const updateStatus = async (id, newStatus) => {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/orders/status/${id}`, {
          status: newStatus,
        });

        // instantly update UI
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
        );
      } catch (err) {
        console.log("Status update failed:", err);
      }
    };

    if (loading) return <p className="p-10">Loading Orders...</p>;

    const statusStyles = {
      ORDER_PLACED: "bg-gray-100 text-gray-700 border-gray-300",
      SHIPPED: "bg-blue-100 text-blue-700 border-blue-300",
      OUT_FOR_DELIVERY: "bg-orange-100 text-orange-700 border-orange-300",
      DELIVERED: "bg-green-100 text-green-700 border-green-300",
    };

    return (
      <div className="p-10 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-[#111418] text-4xl font-black tracking-[-0.033em]">
            Orders
          </p>
        </div>
        <div
          className="flex gap-3 mt-2 overflow-x-auto
    whitespace-nowrap
    scrollbar-hide
    pb-2"
        >
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setCurrentPage("products")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "products"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setCurrentPage("orders")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "orders"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setCurrentPage("get-user")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "get-user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Get User
          </button>
          <button
            onClick={() => setCurrentPage("create-admin")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "create-admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Create Admin
          </button>
        </div>

        <div className="w-full bg-white rounded-2xl border border-gray-200 shadow p-4 overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[1000px]">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="px-4 py-3 border-b">Order ID</th>
                <th className="px-4 py-3 border-b">User ID</th>
                <th className="px-4 py-3 border-b text-center">Items</th>
                <th className="px-4 py-3 border-b text-center">Total Qty</th>
                <th className="px-4 py-3 border-b">Total Price</th>
                <th className="px-4 py-3 border-b">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const totalQty = order.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                return (
                  <tr key={order._id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-3 border-b font-medium">
                      {order._id}
                    </td>

                    <td className="px-4 py-3 border-b">{order?.userId?._id}</td>

                    <td className="px-4 py-3 border-b text-center">
                      {order.items.length}
                    </td>

                    <td className="px-4 py-3 border-b text-center">
                      {totalQty}
                    </td>

                    <td className="px-4 py-3 border-b font-semibold text-blue-600">
                      ₹{order.totalPrice}
                    </td>

                    <td className="px-4 py-3 border-b">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className={`
      px-3 py-2 rounded-lg font-semibold text-sm
      border cursor-pointer transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-1
      ${statusStyles[order.status]}
    `}
                      >
                        <option value="ORDER_PLACED">📝 Order Placed</option>
                        <option value="SHIPPED">📦 Shipped</option>
                        <option value="OUT_FOR_DELIVERY">
                          🚚 Out For Delivery
                        </option>
                        <option value="DELIVERED">✅ Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p className="text-center text-gray-500 py-4">No orders found.</p>
          )}
        </div>
      </div>
    );
  };

  ///get user details page
  const GetUserPage = () => (
    <div className="p-10 flex flex-col items-center gap-6">
      <p className="text-[#111418] text-4xl font-black w-full">Find User</p>
      <div
        className="flex gap-3 mt-2 w-full overflow-x-auto
    whitespace-nowrap
    scrollbar-hide
    pb-2"
      >
        <button
          onClick={() => setCurrentPage("dashboard")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "dashboard"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentPage("products")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "products"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setCurrentPage("orders")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "orders"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setCurrentPage("get-user")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "get-user"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Get User
        </button>
        <button
          onClick={() => setCurrentPage("create-admin")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "create-admin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Create Admin
        </button>
      </div>

      {/* SEARCH BOX */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter User ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg outline-none"
          />

          <button
            onClick={fetchUserById}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* STATES */}
      {userLoading && (
        <p className="text-blue-600 font-semibold">Searching user...</p>
      )}

      {userError && <p className="text-red-500 font-semibold">{userError}</p>}

      {/* USER CARD */}
      {searchedUser && (
        <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md border-2 border-blue-500">
          <h3 className="text-xl font-bold text-center mb-4">
            👤 User Details
          </h3>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>ID:</strong> {searchedUser.id}
            </p>
            <p>
              <strong>Name:</strong> {searchedUser.username}
            </p>
            <p>
              <strong>Email:</strong> {searchedUser.email}
            </p>
            <p>
              <strong>Mobile:</strong> {searchedUser.mobile}
            </p>
            <p>
              <strong>Role:</strong> {searchedUser.role}
            </p>
            <p>
              <strong>Cart Items:</strong> {searchedUser.cart?.length || 0}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  //admin creation
  const CreateAdminPage = () => {
    const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
      mobile: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      setError("");

      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/create-admin`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(res.data.message || "Admin created successfully");
        setForm({
          username: "",
          email: "",
          password: "",
          mobile: "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to create admin");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="p-10 flex flex-col items-center">
        <p className="text-[#111418] text-4xl font-black w-full">
          Create New Admin
        </p>
        <div
          className="flex gap-3 mt-8 w-full overflow-x-auto
    whitespace-nowrap
    scrollbar-hide
    pb-2"
        >
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setCurrentPage("products")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "products"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setCurrentPage("orders")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "orders"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setCurrentPage("get-user")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "get-user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Get User
          </button>
          <button
            onClick={() => setCurrentPage("create-admin")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "create-admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Create Admin
          </button>
        </div>

        {message && (
          <div className=" mt-5 mb-4 p-3 rounded bg-green-100 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-5 mb-4 p-3 rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-10 max-w-[450px] w-full p-10 shadow-2xl rounded-2xl"
        >
          <input
            type="text"
            name="username"
            placeholder="Admin Name"
            value={form.username}
            onChange={handleChange}
            required
            className="border p-3 rounded focus:outline-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-3 rounded focus:outline-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border p-3 rounded focus:outline-blue-500"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
            className="border p-3 rounded focus:outline-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>
    );
  };

  // ---------------------------------------------------------
  // ------------------- FINAL RETURN ------------------------
  // ---------------------------------------------------------
  return (
    <div className="w-full min-h-screen bg-[#f6f7f8] font-sans overflow-hidden">
      <div className="min-h-screen">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "products" && <ProductsPage />}
        {currentPage === "orders" && <OrdersPage />}
        {currentPage === "get-user" && <GetUserPage />}
        {currentPage === "create-admin" && <CreateAdminPage />}
      </div>
      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999 p-4 pointer-events-auto">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg border-4 border-blue-500">
            <h2 className="text-xl font-bold mb-4 text-[#111418]">
              Add New Product
            </h2>

            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border p-2 rounded"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="border p-2 rounded"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Price"
                className="border p-2 rounded"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Stock Quantity"
                className="border p-2 rounded"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
                required
              />

              <select
                className="border p-2 rounded"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                <option value="Uniforms">Uniforms</option>
                <option value="Stationery">Stationery</option>
                <option value="Bags">Bags</option>
                <option value="Books">Books</option>
                <option value="Accessories">Accessories</option>
              </select>

              <input
                type="file"
                accept="image/*"
                className="border p-2 rounded"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
                required
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                  onClick={() => setIsAddProductOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isQtyModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border-4 border-blue-500">
            <h2 className="text-xl font-bold text-center mb-4">
              Update Product Quantity
            </h2>

            <form
              onSubmit={handleUpdateQuantity}
              className="flex flex-col gap-4"
            >
              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Add Quantity (e.g. 5)"
                value={addQty}
                onChange={(e) => setAddQty(e.target.value)}
                required
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsQtyModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
