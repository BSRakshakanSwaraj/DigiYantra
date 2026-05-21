import { useEffect, useState } from "react";

import api from "../services/api";

interface User {

  _id: string;

  name: string;

  email: string;

  role: string;

}

export function AdminApprovalPage() {

  const [users, setUsers] = useState<User[]>([]);

  const token = localStorage.getItem("token");

  // FETCH USERS
  const fetchPendingUsers = async () => {

    try {

      const res = await api.get(
        "/admin/pending-users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchPendingUsers();

  }, []);

  // APPROVE
  const approveUser = async (id: string) => {

    try {

      await api.put(
        `/admin/approve-user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("User approved");

      fetchPendingUsers();

    } catch (error) {

      console.log(error);

    }
  };

  // REJECT
  const rejectUser = async (id: string) => {

    try {

      await api.delete(
        `/admin/reject-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("User rejected");

      fetchPendingUsers();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Pending User Approvals
      </h1>

      {users.length === 0 ? (

        <div className="bg-white p-6 rounded-xl shadow">

          No pending users

        </div>

      ) : (

        <div className="space-y-4">

          {users.map((user) => (

            <div
              key={user._id}
              className="bg-white p-5 rounded-xl shadow flex items-center justify-between"
            >

              <div>

                <h2 className="font-semibold text-lg">
                  {user.name}
                </h2>

                <p className="text-gray-600">
                  {user.email}
                </p>

                <p className="text-sm text-orange-600 capitalize">
                  {user.role}
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => approveUser(user._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectUser(user._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}