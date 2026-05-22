import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";

interface Props {
  activeTab?: string;
}

export function AdminDashboard({
  activeTab = "Overview",
}: Props) {

  const navigate = useNavigate();

  const [complaints, setComplaints] = useState<any[]>([]);

  const [devices, setDevices] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {

    fetchComplaints();

    fetchDevices();

  }, []);

  const fetchComplaints = async () => {

    try {

      const res = await api.get(
        "/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const fetchDevices = async () => {

    try {

      const res = await api.get(
        "/api/devices/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDevices(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // UPDATE COMPLAINT STATUS
  // =========================
  const updateStatus = async (
    id: string,
    status: string
  ) => {

    try {

      await api.put(
        `/api/complaints/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // GROUP DEVICES
  // =========================
  const groupedDevices = devices.reduce(
    (acc: any, device: any) => {

      const user =
        device.user?.name || "Unknown";

      if (!acc[user]) {

        acc[user] = [];

      }

      acc[user].push(device);

      return acc;

    },

    {}
  );

  // =========================
  // TABS
  // =========================
  switch (activeTab) {

    // =================================
    // ALL COMPLAINTS
    // =================================
    case "All Complaints":

      return (

        <div className="space-y-6">

          <h2 className="text-2xl font-bold">
            All Complaints
          </h2>

          {complaints.map((c) => (

            <div
              key={c._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h3 className="font-semibold text-lg">
                {c.title}
              </h3>

              <p>
                <b>Device Name:</b>{" "}
                {c.deviceName}
              </p>

              <p>
                <b>Device ID:</b>{" "}
                {c.deviceId}
              </p>

              <p className="mt-2">
                {c.description}
              </p>

              <p className="text-sm mt-3 text-gray-600">
                User: {c.user?.name} |
                Status: {c.status}
              </p>

              {c.status === "Pending" && (

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() =>
                      updateStatus(
                        c._id,
                        "Approved"
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >

                    Approve

                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        c._id,
                        "Rejected"
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >

                    Reject

                  </button>

                </div>

              )}

            </div>

          ))}

        </div>

      );

    // =================================
    // DEVICES
    // =================================
    case "Devices":

      return (

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Devices by User
          </h2>

          {Object.keys(groupedDevices).map(
            (user) => (

              <div
                key={user}
                className="mb-8"
              >

                <h3 className="text-lg font-bold mb-3">
                  {user}
                </h3>

                {groupedDevices[user].map(
                  (d: any) => (

                    <div
                      key={d._id}
                      className="bg-white p-4 rounded-xl shadow mt-2"
                    >

                      <p className="font-semibold">
                        {d.name}
                      </p>

                      <p>
                        ID: {d.deviceId}
                      </p>

                    </div>

                  )
                )}

              </div>

            )
          )}

        </div>

      );

    // =================================
    // USERS
    // =================================
    case "Users":

      return (

        <div className="space-y-6">

          <h2 className="text-2xl font-bold">
            User Management
          </h2>

          <button
            onClick={() =>
              navigate("/admin-approvals")
            }
            className="bg-orange-600 text-white px-5 py-3 rounded-xl shadow hover:bg-orange-700 transition"
          >

            Pending Approvals

          </button>

        </div>

      );

    // =================================
    // OVERVIEW
    // =================================
    case "Overview":

    default:

      return (

        <div className="space-y-6">

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              Admin Overview
            </h2>

            {/* ✅ APPROVAL BUTTON */}
            <button
              onClick={() =>
                navigate("/admin-approvals")
              }
              className="bg-orange-600 text-white px-5 py-3 rounded-xl shadow hover:bg-orange-700 transition"
            >

              Pending Approvals

            </button>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* USERS */}
            <div
              onClick={() =>
                window.dispatchEvent(
                  new Event("goUsers")
                )
              }
              className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
            >

              <h3 className="font-semibold text-lg">
                Total Users
              </h3>

              <p className="text-3xl mt-3 font-bold text-orange-600">
                {devices.length}
              </p>

            </div>

            {/* COMPLAINTS */}
            <div
              onClick={() =>
                window.dispatchEvent(
                  new Event(
                    "goComplaintsAdmin"
                  )
                )
              }
              className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
            >

              <h3 className="font-semibold text-lg">
                Total Complaints
              </h3>

              <p className="text-3xl mt-3 font-bold text-red-600">
                {complaints.length}
              </p>

            </div>

            {/* DEVICES */}
            <div
              onClick={() =>
                window.dispatchEvent(
                  new Event(
                    "goDevicesAdmin"
                  )
                )
              }
              className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
            >

              <h3 className="font-semibold text-lg">
                Total Devices
              </h3>

              <p className="text-3xl mt-3 font-bold text-blue-600">
                {devices.length}
              </p>

            </div>

          </div>

        </div>

      );
  }
}