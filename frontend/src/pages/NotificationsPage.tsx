import { useEffect, useState } from "react";
import api from "../api";

export function NotificationsPage() {

  const [notifications, setNotifications] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    const res = await api.get("/notifications", {
      headers: { Authorization: `Bearer ${token}` }
    });

    setNotifications(res.data);
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        Notifications
      </h2>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications</p>
      )}

      {notifications.map((n) => (

        <div
          key={n._id}
          className="bg-white p-4 rounded shadow mb-3"
        >

          <p>{n.message}</p>

          <p className="text-xs text-gray-400 mt-1">
            {new Date(n.createdAt).toLocaleString()}
          </p>

        </div>

      ))}

    </div>
  );
}