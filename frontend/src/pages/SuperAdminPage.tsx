import {
  useEffect,
  useState
} from "react";

import api from "../api";

export function SuperAdminPage() {

  const token =
    localStorage.getItem("token");

  // STATES
  const [name, setName] =
    useState("");

  const [collegeCode, setCollegeCode] =
    useState("");

  const [colleges, setColleges] =
    useState<any[]>([]);

  const [admins, setAdmins] =
    useState<any[]>([]);

  // ======================================
  // FETCH COLLEGES
  // ======================================
  const fetchColleges = async () => {

    try {

      const res = await api.get(

        "/superadmin/colleges",

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      // ✅ FIXED
      setColleges(
        res.data.colleges
      );

    } catch (error) {

      console.log(error);

    }

  };

  // ======================================
  // FETCH PENDING ADMINS
  // ======================================
  const fetchPendingAdmins =
    async () => {

      try {

        const res = await api.get(

          "/superadmin/pending-admins",

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        // ✅ FIXED
        setAdmins(
          res.data.admins
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ======================================
  // INITIAL LOAD
  // ======================================
  useEffect(() => {

    fetchColleges();

    fetchPendingAdmins();

  }, []);

  // ======================================
  // CREATE COLLEGE
  // ======================================
  const createCollege = async () => {

    try {

      await api.post(

        "/superadmin/create-college",

        {
          name,
          collegeCode
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "College created successfully"
      );

      setName("");

      setCollegeCode("");

      fetchColleges();

    } catch (error: any) {

      alert(
        error.response?.data?.message
      );

    }

  };

  // ======================================
  // DELETE COLLEGE
  // ======================================
  const deleteCollege = async (
    id: string
  ) => {

    try {

      await api.delete(

        `/superadmin/college/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchColleges();

    } catch (error) {

      console.log(error);

    }

  };

  // ======================================
  // APPROVE ADMIN
  // ======================================
  const approveAdmin = async (
    id: string
  ) => {

    try {

      await api.put(

        `/superadmin/approve-admin/${id}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchPendingAdmins();

    } catch (error) {

      console.log(error);

    }

  };

  // ======================================
  // REJECT ADMIN
  // ======================================
  const rejectAdmin = async (
    id: string
  ) => {

    try {

      await api.delete(

        `/superadmin/reject-admin/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchPendingAdmins();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-8 space-y-8">

      {/* HEADER */}
      <div>

        <h1 className="text-4xl font-bold">

          Super Admin Dashboard 🚀

        </h1>

        <p className="text-gray-500 mt-2">

          Manage colleges and admins

        </p>

      </div>

      {/* CREATE COLLEGE */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">

        <h2 className="text-2xl font-semibold">

          Create College

        </h2>

        <input
          placeholder="College Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-3 rounded w-full"
        />

        <input
          placeholder="College Code"
          value={collegeCode}
          onChange={(e) =>
            setCollegeCode(
              e.target.value
            )
          }
          className="border p-3 rounded w-full"
        />

        <button
          onClick={createCollege}
          className="bg-orange-600 text-white px-5 py-3 rounded-xl"
        >

          Create College

        </button>

      </div>

      {/* PENDING ADMINS */}
      <div className="space-y-4">

        <h2 className="text-2xl font-bold">

          Pending Admin Approvals

        </h2>

        {admins.length === 0 ? (

          <div className="bg-white p-5 rounded-xl shadow">

            No pending admins

          </div>

        ) : (

          admins.map((admin) => (

            <div
              key={admin._id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >

              <div>

                <h3 className="font-semibold text-lg">

                  {admin.name}

                </h3>

                <p>{admin.email}</p>

                <p className="text-sm text-gray-500">

                  College:
                  {" "}
                  {admin.collegeId?.name}

                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    approveAdmin(
                      admin._id
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >

                  Approve

                </button>

                <button
                  onClick={() =>
                    rejectAdmin(
                      admin._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >

                  Reject

                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* COLLEGES */}
      <div className="space-y-4">

        <h2 className="text-2xl font-bold">

          All Colleges

        </h2>

        {colleges.map((college) => (

          <div
            key={college._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >

            <div>

              <h3 className="font-semibold text-lg">

                {college.name}

              </h3>

              <p className="text-gray-600">

                {college.collegeCode}

              </p>

            </div>

            <button
              onClick={() =>
                deleteCollege(
                  college._id
                )
              }
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >

              Delete

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}