import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/app.Store";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminPage = () => {
    const { fetchAllUsers, logout, updateUserVerification, deleteUser, users } = useAuthStore();
    const [loadingUserId, setLoadingUserId] = useState(null);
    const [loadingUserEmail, setLoadingUserEmail] = useState(null);
    const navigate = useNavigate();

    // Fetch all users on component mount
    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    // Toggle isVerified state
    const toggleVerification = async (userId, currentStatus) => {
        setLoadingUserId(userId);
        try {
            await updateUserVerification(userId, !currentStatus);
        } catch (error) {
            console.error("Error updating verification status:", error);
        } finally {
            setLoadingUserId(null);
        }
    };

    // Delete user
    const handleDeleteUser = async (userEmail) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setLoadingUserEmail(userEmail);
            try {
                await deleteUser(userEmail);
                fetchAllUsers(); // Refresh the user list
            } catch (error) {
                console.error("Error deleting user:", error);
            } finally {
                setLoadingUserEmail(null);
            }
        }
    };

    // Handle logout
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="p-4 min-w-[100vw] xs:max-w-[50vw] min-h-[100vh] flex flex-col items-center justify-center pagebg">
            <div className="flex justify-between items-center w-full max-w-4xl mb-4">
                <Link to="/" className="text-xl font-bold">
                    <span className="text-blue-500">My</span>App
                </Link>
                <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
            <div className="overflow-x-scroll w-full">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Created At</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Last Login</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Verified</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id} className="hover:bg-blue-300 active:bg-green-200 transition-colors duration-200 cursor-pointer">
                                <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                                    {new Date(user.createdAt).toLocaleString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                                    {user.isVerified ? "Yes" : "No"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm md:text-base flex gap-2">
                                    <button
                                        className={`w-[6rem] px-4 py-2 rounded flex items-center justify-center ${user.isVerified ? "bg-red-500 text-white" : "bg-green-500 text-white"
                                            }`}
                                        onClick={() => toggleVerification(user._id, user.isVerified)}
                                        disabled={loadingUserId === user._id}
                                    >
                                        {loadingUserId === user._id ? (
                                            <Loader className="animate-spin ml-2" />
                                        ) : (
                                            user.isVerified ? "Unverify" : "Verify"
                                        )}
                                    </button>

                                    <button
                                        className="w-[6rem] px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 flex items-center justify-center"
                                        onClick={() => handleDeleteUser(user.email)}
                                        disabled={loadingUserEmail === user.email}
                                    >
                                        {loadingUserEmail === user.email ? (
                                            <Loader className="animate-spin ml-2" />
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;