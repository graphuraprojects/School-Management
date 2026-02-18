import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null); // null initially
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    mobile: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(
          `/api/users/get-user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const fetchedUser = res.data.user; // <-- get user object
        setUser(fetchedUser);
        setUsername(fetchedUser.username);
        setMobile(fetchedUser.mobile);

        const addrRes = await axios.get(
          `/api/users/get-address/${userId}`
        );
        if (addrRes.data.addresses.length > 0) {
          setAddress(addrRes.data.addresses[0]);
          setAddressForm({
            fullName: addrRes.data.addresses[0].fullName,
            mobile: addrRes.data.addresses[0].mobile,
            addressLine: addrRes.data.addresses[0].addressLine,
            city: addrRes.data.addresses[0].city,
            state: addrRes.data.addresses[0].state,
            pincode: addrRes.data.addresses[0].pincode,
            landmark: addrRes.data.addresses[0].landmark,
          });
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userId, token]);

  const handleSaveUser = async () => {
    try {
      const res = await axios.put(
        "/api/users/update-user",
        { username, mobile },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setUsername(res.data.user.username);
      setMobile(res.data.user.mobile);

      toast.success("User updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating user");
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (address) {
        await axios.put(`/api/users/update-address`, {
          userId,
          addressId: address._id,
          address: addressForm,
        });
        toast.success("Address updated!");
      } else {
        await axios.post(`/api/users/add-address`, {
          userId,
          address: addressForm,
        });
        toast.success("Address added!");
      }

      const addrRes = await axios.get(
        `/api/users/get-address/${userId}`
      );
      setAddress(addrRes.data.addresses[0]);
      setEditingAddress(false);
    } catch (err) {
      console.error(err);
      toast.error("Error saving address");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-[#6fd513] mb-4"></i>
        <p className="text-gray-600 font-semibold">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8 mt-20">
      {/* Personal Details */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-[#6fd513] transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <i className="fa-solid fa-user text-[#6fd513]"></i>
          Personal Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <i className="fa-solid fa-user text-[#6fd513] text-sm"></i>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <i className="fa-solid fa-envelope text-[#6fd513] text-sm"></i>
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <i className="fa-solid fa-phone text-[#6fd513] text-sm"></i>
              Phone Number
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
            />
          </div>
        </div>
        <button
          onClick={handleSaveUser}
          className="mt-6 px-6 py-2.5 bg-[#6fd513] text-white rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
        >
          <i className="fa-solid fa-floppy-disk"></i>
          Save Changes
        </button>
      </div>

      {/* Address Details */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-[#6fd513] transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <i className="fa-solid fa-location-dot text-[#6fd513]"></i>
          Address Details
        </h2>
        {editingAddress ? (
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={addressForm.fullName}
              onChange={(e) =>
                setAddressForm({ ...addressForm, fullName: e.target.value })
              }
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
              required
            />
            <input
              type="text"
              placeholder="Mobile"
              value={addressForm.mobile}
              onChange={(e) =>
                setAddressForm({ ...addressForm, mobile: e.target.value })
              }
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
              required
            />
            <input
              type="text"
              placeholder="Address Line"
              value={addressForm.addressLine}
              onChange={(e) =>
                setAddressForm({ ...addressForm, addressLine: e.target.value })
              }
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                value={addressForm.city}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, city: e.target.value })
                }
                className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={addressForm.state}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, state: e.target.value })
                }
                className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={addressForm.pincode}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, pincode: e.target.value })
                }
                className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Landmark"
              value={addressForm.landmark}
              onChange={(e) =>
                setAddressForm({ ...addressForm, landmark: e.target.value })
              }
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#6fd513] text-white rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <i className="fa-solid fa-check"></i>
                Save Address
              </button>
              <button
                type="button"
                onClick={() => setEditingAddress(false)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <i className="fa-solid fa-times"></i>
                Cancel
              </button>
            </div>
          </form>
        ) : address ? (
          <div className="border-2 border-gray-200 p-5 rounded-xl space-y-3 bg-gray-50 hover:border-[#6fd513] transition-all duration-300">
            <p className="text-gray-800 font-semibold text-lg flex items-center gap-2">
              <i className="fa-solid fa-user text-[#6fd513]"></i>
              {address.fullName}
            </p>
            <p className="text-gray-700 flex items-start gap-2">
              <i className="fa-solid fa-map-marker-alt text-[#6fd513] mt-1"></i>
              <span>{address.addressLine}, {address.city}, {address.state} - {address.pincode}</span>
            </p>
            {address.landmark && (
              <p className="text-gray-600 flex items-center gap-2">
                <i className="fa-solid fa-landmark text-[#6fd513]"></i>
                <span>Landmark: {address.landmark}</span>
              </p>
            )}
            <p className="text-gray-700 flex items-center gap-2">
              <i className="fa-solid fa-phone text-[#6fd513]"></i>
              <span>Mobile: {address.mobile}</span>
            </p>
            <button
              onClick={() => setEditingAddress(true)}
              className="mt-4 px-6 py-2.5 bg-[#6fd513] text-white rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <i className="fa-solid fa-edit"></i>
              Edit Address
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <i className="fa-solid fa-map-location-dot text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600 font-semibold mb-4">No address added yet.</p>
            <button
              onClick={() => setEditingAddress(true)}
              className="px-6 py-2.5 bg-[#6fd513] text-white rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 mx-auto"
            >
              <i className="fa-solid fa-plus"></i>
              Add Address
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
