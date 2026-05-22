import { useEffect, useState } from "react";
import api from "../api";

interface Props {
  activeTab?: string;
}

export function ServiceDashboard({ activeTab = "Assigned" }: Props) {

  const [complaints, setComplaints] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {

    const res = await api.get("/api/complaints", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setComplaints(res.data);
  };

  const updateStatus = async (id: string, status: string) => {

    await api.put(
      `/api/complaints/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchComplaints();
  };



  switch (activeTab) {

    case "Assigned":

      return (

        <div className="space-y-6">

          <h2 className="text-2xl font-bold">Assigned Complaints</h2>

          {complaints
            .filter(
              (c) =>
                c.status === "Approved" || c.status === "In Progress"
            )
            .map((c) => (

              <div key={c._id} className="bg-white p-4 rounded shadow">

                <h3 className="font-semibold">{c.title}</h3>

                <p><b>Device Name:</b> {c.deviceName}</p>

                <p><b>Device ID:</b> {c.deviceId}</p>

                <p>{c.description}</p>

                <p className="text-sm mt-2">
                  User: {c.user?.name} | Status: {c.status}
                </p>

                {c.status === "Approved" && (

                  <button
                    onClick={() =>
                      updateStatus(c._id, "In Progress")
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded mt-3"
                  >
                    Start Work
                  </button>

                )}

                {c.status === "In Progress" && (

                  <button
                    onClick={() =>
                      updateStatus(c._id, "Resolved")
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded mt-3"
                  >
                    Mark Completed
                  </button>

                )}

              </div>

            ))}

        </div>

      );



    case "Completed":

      return (

        <div className="space-y-6">

          <h2 className="text-2xl font-bold">Completed Work</h2>

          {complaints
            .filter((c) => c.status === "Resolved")
            .map((c) => (

              <div key={c._id} className="bg-white p-4 rounded shadow">

                <h3>{c.title}</h3>

                <p><b>Device Name:</b> {c.deviceName}</p>

                <p><b>Device ID:</b> {c.deviceId}</p>

                <p>{c.description}</p>

                <p>Status: {c.status}</p>

              </div>

            ))}

        </div>

      );



    case "Overview":

    default:

      return <h2 className="text-2xl font-bold">Service Overview</h2>;

  }

}