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
          `http://localhost:3000/api/users/get-user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const fetchedUser = res.data.user; // <-- get user object
        setUser(fetchedUser);
        setUsername(fetchedUser.username);
        setMobile(fetchedUser.mobile);

        const addrRes = await axios.get(
          `http://localhost:3000/api/users/get-address/${userId}`
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
        "http://localhost:3000/api/users/update-user",
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
        await axios.put(`${import.meta.env.VITE_API_URL}/users/update-address`, {
          userId,
          addressId: address._id,
          address: addressForm,
        });
        toast.success("Address updated!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/users/add-address`, {
          userId,
          address: addressForm,
        });
        toast.success("Address added!");
      }

      const addrRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/get-address/${userId}`
      );
      setAddress(addrRes.data.addresses[0]);
      setEditingAddress(false);
    } catch (err) {
      console.error(err);
      toast.error("Error saving address");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Personal Details */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <button
          onClick={handleSaveUser}
          className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </div>

      {/* Address Details */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Address Details</h2>
        {editingAddress ? (
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={addressForm.fullName}
              onChange={(e) =>
                setAddressForm({ ...addressForm, fullName: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              placeholder="Mobile"
              value={addressForm.mobile}
              onChange={(e) =>
                setAddressForm({ ...addressForm, mobile: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              placeholder="Address Line"
              value={addressForm.addressLine}
              onChange={(e) =>
                setAddressForm({ ...addressForm, addressLine: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={addressForm.state}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, state: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={addressForm.pincode}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, pincode: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Save Address
              </button>
              <button
                type="button"
                onClick={() => setEditingAddress(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : address ? (
          <div className="border p-4 rounded-lg space-y-2 border-gray-300">
            <p>
              <strong>{address.fullName}</strong>{" "}
            </p>
            <p>
              {address.addressLine}, {address.city}, {address.state} -{" "}
              {address.pincode}
            </p>
            <p>Landmark: {address.landmark}</p>
            <p>Mobile: {address.mobile}</p>
            <button
              onClick={() => setEditingAddress(true)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit Address
            </button>
          </div>
        ) : (
          <div>
            <p>No address added yet.</p>
            <button
              onClick={() => setEditingAddress(true)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
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
