import React, { useEffect, useState } from "react";
import api from "../api";
import QRScanner from "../components/QRScanner";

interface Props {
  activeTab?: string;
}

interface Complaint {
  _id: string;
  title: string;
  description: string;
  status: string;
  deviceId: string;
  deviceName?: string;
}

interface Device {
  _id: string;
  name: string;
  deviceId: string;
  qrCode: string;
}

export function UserDashboard({ activeTab = "Overview" }: Props) {

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  const [deviceName, setDeviceName] = useState("");
  const [deviceCode, setDeviceCode] = useState("");

  const [deviceId, setDeviceId] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplaints();
    fetchDevices();
  }, []);

  const fetchComplaints = async () => {
    const res = await api.get("/api/complaints", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setComplaints(res.data);
  };

  const fetchDevices = async () => {
    const res = await api.get("/api/devices/my-devices", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setDevices(res.data);
  };

const addDevice = async () => {

  try {

    if (!deviceName || !deviceCode) {

      alert("Enter device details");

      return;

    }

    await api.post(

      "/api/devices",

      {
        name: deviceName,
        deviceId: deviceCode
      },

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    );

    alert("Device added successfully");

    setDeviceName("");
    setDeviceCode("");

    fetchDevices();

  } catch (error: any) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Error adding device"
    );

  }

};

  const raiseDeviceComplaint = async (id: string) => {
    const problem = prompt("Describe the issue");
    if (!problem) return;

    await api.post(
      "/api/complaints",
      {
        title: "Device Complaint",
        description: problem,
        deviceId: id
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchComplaints();
  };

  const handleScan = (data: string) => {
    if (data) setDeviceId(data);
  };

  const submitQRComplaint = async () => {
    if (!deviceId || !description) {
      alert("Fill all fields");
      return;
    }

    await api.post(
      "/api/complaints",
      {
        title: "QR Device Complaint",
        description,
        deviceId
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Complaint submitted!");
    setDeviceId("");
    setDescription("");
    fetchComplaints();
  };

  const viewHistory = async (deviceId: string) => {
    const res = await api.get(`/api/complaints/device/${deviceId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert(JSON.stringify(res.data, null, 2));
  };

  switch (activeTab) {

    case "My Complaints":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">My Complaints</h2>

          {complaints.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded shadow mb-4">
              <h3 className="font-semibold">{c.title}</h3>
              <p><b>Device:</b> {c.deviceName}</p>
              <p><b>Device ID:</b> {c.deviceId}</p>
              <p><b>Problem:</b> {c.description}</p>
              <p className="mt-2"><b>Status:</b> {c.status}</p>
            </div>
          ))}
        </div>
      );

    case "My Devices":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Add Device</h2>

          <input
            placeholder="Device Name"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="border p-2 mr-2"
          />

          <input
            placeholder="Device ID"
            value={deviceCode}
            onChange={(e) => setDeviceCode(e.target.value)}
            className="border p-2 mr-2"
          />

          <button
            onClick={addDevice}
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            Add Device
          </button>

          <h2 className="text-xl font-bold mt-6">My Devices</h2>

          {devices.map((d) => (
            <div key={d._id} className="bg-white p-4 rounded shadow mt-3">
              <h3 className="font-semibold">{d.name}</h3>
              <p>ID: {d.deviceId}</p>
              <img src={d.qrCode} alt="QR" className="w-32 mt-2"/>

              <button
                onClick={() => raiseDeviceComplaint(d.deviceId)}
                className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
              >
                Raise Complaint
              </button>

              <button
                onClick={() => viewHistory(d.deviceId)}
                className="bg-gray-700 text-white px-3 py-1 rounded mt-2 ml-2"
              >
                View History
              </button>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-8">Scan Device QR</h2>

          <QRScanner onScan={handleScan}/>

          {deviceId && (
            <div className="mt-4 bg-white p-4 rounded shadow">
              <p>Device ID: {deviceId}</p>

              <textarea
                placeholder="Describe problem"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full mt-2"
              />

              <button
                onClick={submitQRComplaint}
                className="bg-orange-600 text-white px-4 py-2 mt-2 rounded"
              >
                Submit Complaint
              </button>
            </div>
          )}
        </div>
      );

    default:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Faculty Dashboard</h2>

          {/* DEVICES CARD */}
          <div
            onClick={() => window.dispatchEvent(new Event("goDevices"))}
            className="bg-white p-5 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">My Devices</h3>

            {devices.length === 0 ? (
              <p className="text-gray-500">No devices added</p>
            ) : (
              devices.map((d) => (
                <p key={d._id} className="text-gray-700">
                  • {d.name}
                </p>
              ))
            )}
          </div>

          {/* COMPLAINT STATS */}
          <div
            onClick={() => window.dispatchEvent(new Event("goComplaints"))}
            className="bg-white p-5 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">My Complaints</h3>

            <div className="space-y-1 text-gray-700">
              <p>Pending: {complaints.filter(c => c.status === "Pending").length}</p>
              <p>Approved: {complaints.filter(c => c.status === "Approved").length}</p>
              <p>Rejected: {complaints.filter(c => c.status === "Rejected").length}</p>
            </div>
          </div>
        </div>
      );
  }
}