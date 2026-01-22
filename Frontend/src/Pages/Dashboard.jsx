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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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
      setUserError("User not found",err);
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
    <div className="p-10 flex flex-col gap-6 mt-15">
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
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentPage("products")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "products"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setCurrentPage("orders")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "orders"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setCurrentPage("get-user")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "get-user"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Get User
        </button>
        <button
          onClick={() => setCurrentPage("create-admin")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "create-admin"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Create Admin
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", count: "1850+", icon: "fa-users" },
          { title: "Total Activities", count: "40+", icon: "fa-calendar-check" },
          { title: "Products in Stock", count: totalQty, icon: "fa-boxes" },
          { title: "Total Revenue", count: "₹1,50,000+", icon: "fa-rupee-sign" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 rounded-2xl p-6 bg-white border-2 border-[#6fd513]/20 items-center cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:border-[#6fd513] duration-300 transition-all"
          >
            <div className="w-16 h-16 bg-[#6fd513]/10 rounded-full flex items-center justify-center mb-2">
              <i className={`fa-solid ${stat.icon} text-[#6fd513] text-2xl`}></i>
            </div>
            <p className="text-gray-700 font-semibold text-center">{stat.title}</p>
            <p className="text-[#6fd513] text-3xl font-bold">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Admissions */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border-2 border-[#6fd513]/20 p-6 hover:border-[#6fd513]/40 transition-all duration-300">
        <h2 className="text-3xl font-bold text-[#6fd513] mb-4 flex items-center gap-2">
          <i className="fa-solid fa-graduation-cap"></i>
          Recent Admissions
        </h2>

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#e0fac8] text-[#6fd513] sticky top-0">
              <tr>
                <th className="px-6 py-3 border-b border-[#6fd513]/30">Student Name</th>
                <th className="px-6 py-3 border-b border-[#6fd513]/30">Parent Name</th>
                <th className="px-6 py-3 border-b border-[#6fd513]/30">Phone</th>
                <th className="px-6 py-3 border-b border-[#6fd513]/30 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((row) => (
                <tr key={row._id} className="hover:bg-[#e0fac8]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#3f5e25]">
                    {row.fullName}
                  </td>
                  <td className="px-6 py-4 text-[#6fd513] font-semibold">{row.parentName}</td>
                  <td className="px-6 py-4 text-gray-700">{row.parentPhone}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleView(row._id)}
                      className="px-4 py-2 bg-[#6fd513] text-white rounded-xl cursor-pointer hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 mx-auto"
                    >
                      <i className="fa-solid fa-eye"></i>
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl mt-40 shadow-2xl w-full max-w-3xl my-8 border-2 border-[#6fd513] relative max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white rounded-t-2xl border-b-2 border-[#6fd513]/20 px-6 py-4 z-10 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#6fd513] flex items-center gap-2">
                <i className="fa-solid fa-user-graduate"></i>
                {selectedAdmission.fullName}
              </h2>
              <button
                className="cursor-pointer text-gray-500 hover:text-[#6fd513] text-xl font-bold transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#6fd513]/10"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 px-6 py-4">

            {selectedAdmission.studentPhoto && (
              <div className="flex justify-center mb-6">
                <img
                  src={selectedAdmission.studentPhoto}
                  alt="Student"
                  className="w-24 h-24 rounded-full object-cover border-3 border-[#6fd513] shadow-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#effee3] p-4 rounded-xl border-2 border-[#6fd513]/30 shadow-sm hover:border-[#6fd513]/60 transition-all">
                <h3 className="font-semibold text-[#6fd513] mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-user"></i>
                  Personal Info
                </h3>
                <p className="text-gray-700">
                  <strong>DOB:</strong> {selectedAdmission.dateOfBirth}
                </p>
                <p className="text-gray-700">
                  <strong>Gender:</strong> {selectedAdmission.gender}
                </p>
                <p className="text-gray-700">
                  <strong>Nationality:</strong> {selectedAdmission.nationality}
                </p>
                <p className="text-gray-700">
                  <strong>Proposed Grade:</strong>{" "}
                  {selectedAdmission.proposedGrade}
                </p>
              </div>

              <div className="bg-[#effee3] p-4 rounded-xl border-2 border-[#6fd513]/30 shadow-sm hover:border-[#6fd513]/60 transition-all">
                <h3 className="font-semibold text-[#6fd513] mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-users"></i>
                  Parent Info
                </h3>
                <p className="text-gray-700">
                  <strong>Name:</strong> {selectedAdmission.parentName}
                </p>
                <p className="text-gray-700">
                  <strong>Relationship:</strong>{" "}
                  {selectedAdmission.relationship}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {selectedAdmission.parentEmail}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {selectedAdmission.parentPhone}
                </p>
                <p className="text-gray-700">
                  <strong>WhatsApp:</strong> {selectedAdmission.parentWhatsApp}
                </p>
              </div>

              <div className="bg-[#effee3] p-4 rounded-xl border-2 border-[#6fd513]/30 shadow-sm hover:border-[#6fd513]/60 transition-all">
                <h3 className="font-semibold text-[#6fd513] mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-phone"></i>
                  Emergency Contact
                </h3>
                <p className="text-gray-700">
                  <strong>Name:</strong> {selectedAdmission.emergencyName}
                </p>
                <p className="text-gray-700">
                  <strong>Relationship:</strong>{" "}
                  {selectedAdmission.emergencyRelationship}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {selectedAdmission.emergencyPhone}
                </p>
              </div>

              <div className="bg-[#effee3] p-4 rounded-xl border-2 border-[#6fd513]/30 shadow-sm hover:border-[#6fd513]/60 transition-all">
                <h3 className="font-semibold text-[#6fd513] mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-book"></i>
                  Academic Info
                </h3>
                <p className="text-gray-700">
                  <strong>Previous School:</strong>{" "}
                  {selectedAdmission.previousSchool}
                </p>
                <p className="text-gray-700">
                  <strong>Previous Grade:</strong>{" "}
                  {selectedAdmission.previousGrade}
                </p>
                <p className="text-gray-700">
                  <strong>Notes:</strong>{" "}
                  {selectedAdmission.additionalNotes || "N/A"}
                </p>
              </div>
            </div>

            {/* Files */}
            <div className="mt-6 flex gap-6 flex-wrap pb-4">
              {selectedAdmission.studentPhoto && (
                <a
                  href={selectedAdmission.studentPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6fd513] hover:text-[#53a110] hover:underline flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-[#6fd513]/10"
                >
                  <i className="fa-solid fa-image"></i>
                  View Student Photo
                </a>
              )}
              {selectedAdmission.birthCertificate && (
                <a
                  href={selectedAdmission.birthCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6fd513] hover:text-[#53a110] hover:underline flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-[#6fd513]/10"
                >
                  <i className="fa-solid fa-file"></i>
                  View Birth Certificate
                </a>
              )}
              {selectedAdmission.previousMarksheets && (
                <a
                  href={selectedAdmission.previousMarksheets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6fd513] hover:text-[#53a110] hover:underline flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-[#6fd513]/10"
                >
                  <i className="fa-solid fa-file-alt"></i>
                  View Previous Marksheets
                </a>
              )}
            </div>
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
    <div className="p-10 flex flex-col gap-6 mt-15">
      {/* TOP BAR SWITCHER */}
      <div className="flex justify-between items-center">
        <p className="text-[#111418] text-4xl font-black">Products</p>

        <button
          onClick={() => setIsAddProductOpen(true)}
          className="px-6 py-3 bg-[#6fd513] hover:bg-[#53a110] text-white rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 font-semibold"
        >
          <i className="fa-solid fa-plus"></i>
          Add Product
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
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentPage("products")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "products"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setCurrentPage("orders")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "orders"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setCurrentPage("get-user")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "get-user"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Get User
        </button>
        <button
          onClick={() => setCurrentPage("create-admin")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "create-admin"
              ? "bg-[#6fd513] text-white"
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
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#6fd513]/20 p-4 hover:border-[#6fd513]/40 transition-all duration-300">
        <div className="max-h-[450px] overflow-y-auto">
          <table className="min-w-[700px] w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e0fac8] text-[#6fd513] sticky top-0">
                <th className="px-4 py-3 border-b border-[#6fd513]/30">Image</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30">Title</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30">Category</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30">Price</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30">Stock</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30 text-center">
                  Increase Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="hover:bg-[#e0fac8]/50 transition-colors">
                  <td className="px-4 py-3 border-b">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover shadow-md border-2 border-[#6fd513]/20"
                    />
                  </td>

                  <td className="px-4 py-3 border-b font-medium text-gray-800">
                    {item.title}
                  </td>

                  <td className="px-4 py-3 border-b text-[#617589]">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 border-b font-semibold text-[#6fd513]">
                    ₹{item.price}
                  </td>

                  <td className="px-4 py-3 border-b text-gray-700">{item.quantity}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="bg-[#6fd513] text-white px-4 py-2 rounded-xl hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 mx-auto"
                      onClick={() => {
                        setQtyProductId(item._id);
                        setIsQtyModalOpen(true);
                      }}
                    >
                      <i className="fa-solid fa-plus"></i>
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
      SHIPPED: "bg-[#e0fac8] text-[#6fd513] border-[#6fd513]/50",
      OUT_FOR_DELIVERY: "bg-orange-100 text-orange-700 border-orange-300",
      DELIVERED: "bg-[#e0fac8] text-[#53a110] border-[#6fd513]/50",
    };

    return (
      <div className="p-10 flex flex-col gap-6 mt-15">
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
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setCurrentPage("products")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "products"
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setCurrentPage("orders")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "orders"
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setCurrentPage("get-user")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "get-user"
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Get User
          </button>
          <button
            onClick={() => setCurrentPage("create-admin")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "create-admin"
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Create Admin
          </button>
        </div>

        <div className="w-full bg-white rounded-2xl border-2 border-[#6fd513]/20 shadow-xl p-4 overflow-x-auto hover:border-[#6fd513]/40 transition-all duration-300">
          <table className="w-full border-collapse text-left min-w-[1000px]">
            <thead>
              <tr className="bg-[#e0fac8] text-[#6fd513]">
                <th className="px-4 py-3 border-b border-[#6fd513]/30">Order ID</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30">User ID</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30 text-center">Items</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30 text-center">Total Qty</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30">Total Price</th>
                <th className="px-4 py-3 border-b border-[#6fd513]/30">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const totalQty = order.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                return (
                  <tr key={order._id} className="hover:bg-[#e0fac8]/50 transition-colors">
                    <td className="px-4 py-3 border-b font-medium text-gray-800">
                      {order._id}
                    </td>

                    <td className="px-4 py-3 border-b text-gray-700">{order?.userId?._id}</td>

                    <td className="px-4 py-3 border-b text-center text-gray-700">
                      {order.items.length}
                    </td>

                    <td className="px-4 py-3 border-b text-center text-gray-700">
                      {totalQty}
                    </td>

                    <td className="px-4 py-3 border-b font-semibold text-[#6fd513]">
                      ₹{order.totalPrice}
                    </td>

                    <td className="px-4 py-3 border-b">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className={`
      px-3 py-2 rounded-xl font-semibold text-sm
      border-2 cursor-pointer transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513]
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
    <div className="p-10 flex flex-col items-center gap-6 mt-15">
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
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentPage("products")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "products"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setCurrentPage("orders")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "orders"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setCurrentPage("get-user")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "get-user"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Get User
        </button>
        <button
          onClick={() => setCurrentPage("create-admin")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === "create-admin"
              ? "bg-[#6fd513] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Create Admin
        </button>
      </div>

      {/* SEARCH BOX */}
      <div className="bg-white shadow-xl rounded-2xl border-2 border-[#6fd513]/20 p-6 w-full max-w-md hover:border-[#6fd513]/40 transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter User ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className="w-full border-2 border-gray-200 px-4 py-2 rounded-xl outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
          />

          <button
            onClick={fetchUserById}
            className="w-full sm:w-auto bg-[#6fd513] text-white px-6 py-2 rounded-xl hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 font-semibold"
          >
            <i className="fa-solid fa-search"></i>
            Search
          </button>
        </div>
      </div>

      {/* STATES */}
      {userLoading && (
        <p className="text-[#6fd513] font-semibold flex items-center gap-2">
          <i className="fa-solid fa-spinner fa-spin"></i>
          Searching user...
        </p>
      )}

      {userError && <p className="text-red-500 font-semibold">{userError}</p>}

      {/* USER CARD */}
      {searchedUser && (
        <div className="bg-white shadow-2xl rounded-2xl border-2 border-[#6fd513] p-6 w-full max-w-md">
          <h3 className="text-xl font-bold text-center mb-4 text-[#6fd513] flex items-center justify-center gap-2">
            <i className="fa-solid fa-user"></i>
            User Details
          </h3>

          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-id-card text-[#6fd513]"></i>
              <strong>ID:</strong> {searchedUser.id}
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-user text-[#6fd513]"></i>
              <strong>Name:</strong> {searchedUser.username}
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-[#6fd513]"></i>
              <strong>Email:</strong> {searchedUser.email}
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-[#6fd513]"></i>
              <strong>Mobile:</strong> {searchedUser.mobile}
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-user-shield text-[#6fd513]"></i>
              <strong>Role:</strong> {searchedUser.role}
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-shopping-cart text-[#6fd513]"></i>
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
      <div className="p-10 flex flex-col items-center mt-15">
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
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setCurrentPage("products")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "products"
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setCurrentPage("orders")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "orders"
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setCurrentPage("get-user")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "get-user"
                ? "bg-[#6fd513] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Get User
          </button>
          <button
            onClick={() => setCurrentPage("create-admin")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === "create-admin"
                ? "bg-[#6fd513] text-white"
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
          className="flex flex-col gap-4 mt-10 max-w-[450px] w-full p-10 shadow-2xl rounded-2xl border-2 border-[#6fd513]/20 bg-white hover:border-[#6fd513]/40 transition-all duration-300"
        >
          <input
            type="text"
            name="username"
            placeholder="Admin Name"
            value={form.username}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#6fd513] text-white py-3 rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Creating...
              </>
            ) : (
              <>
                <i className="fa-solid fa-user-plus"></i>
                Create Admin
              </>
            )}
          </button>
        </form>
      </div>
    );
  };

  // ---------------------------------------------------------
  // ------------------- FINAL RETURN ------------------------
  // ---------------------------------------------------------
  return (
    <div className="w-full bg-[#f6f7f8] font-sans overflow-hidden">
      <div className="">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "products" && <ProductsPage />}
        {currentPage === "orders" && <OrdersPage />}
        {currentPage === "get-user" && <GetUserPage />}
        {currentPage === "create-admin" && <CreateAdminPage />}
      </div>
      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999 p-4 pointer-events-auto">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg border-2 border-[#6fd513]">
            <h2 className="text-xl font-bold mb-4 text-[#6fd513] flex items-center gap-2">
              <i className="fa-solid fa-plus-circle"></i>
              Add New Product
            </h2>

            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
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
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Stock Quantity"
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
                required
              />

              <select
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
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
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
                required
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all duration-300 font-semibold"
                  onClick={() => setIsAddProductOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#6fd513] text-white hover:bg-[#53a110] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 font-semibold"
                >
                  <i className="fa-solid fa-check"></i>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isQtyModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border-2 border-[#6fd513]">
            <h2 className="text-xl font-bold text-center mb-4 text-[#6fd513] flex items-center justify-center gap-2">
              <i className="fa-solid fa-boxes"></i>
              Update Product Quantity
            </h2>

            <form
              onSubmit={handleUpdateQuantity}
              className="flex flex-col gap-4"
            >
              <input
                type="number"
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:border-[#6fd513] focus:ring-2 focus:ring-[#6fd513]/20 transition-all"
                placeholder="Add Quantity (e.g. 5)"
                value={addQty}
                onChange={(e) => setAddQty(e.target.value)}
                required
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
                  onClick={() => setIsQtyModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#6fd513] text-white rounded-xl hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 font-semibold"
                >
                  <i className="fa-solid fa-check"></i>
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
