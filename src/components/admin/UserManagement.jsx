import React, { useEffect, useState } from "react";
import { allUsers, changeRole } from "../../services/adminService";
import toast from "react-hot-toast";
import { confirmToast } from "../../utils/ConfirmToast";

function UserManagement() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [roleLoading, setRoleLoading] = useState(false);

  const limit = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await allUsers(page, limit);
      setUsers(response.data?.users || []);
      setTotalPages(response.data?.pages || 1);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleRoleChange = async (email, newRole) => {
    confirmToast(`Change role to ${newRole}?`, async () => {
      setRoleLoading(true);
      try {
        const response = await changeRole({ email, role: newRole });
        if (response.success) {
          toast.success("Role updated successfully");
          fetchUsers();
        }
      } catch (error) {
        toast.error("Failed to update role");
      }
      setRoleLoading(false);
    });
  };

  return (
    <div className="pl-6 pb-6 pr-6 pt-12 sm:p-10">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-sm sm:text-base table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={user._id} className="text-center">
                  <td className="border px-4 py-2">{(page - 1) * limit + (i + 1)}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2 flex flex-col sm:flex-row justify-center gap-2">
                    {["user", "admin"].map((role) => (
                      role !== user.role && (
                        <button
                          key={role}
                          onClick={() => handleRoleChange(user.email, role)}
                          disabled={roleLoading}
                          className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Set {role}
                        </button>
                      )
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>)}
      </div>
    </div>
  );
}

export default UserManagement;
