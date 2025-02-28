import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store.ts";
import { loginUser, getAllUsers } from "../redux/UserSlice.ts";
import loginVideo from "../Aseats/video/greenShadowVideo.mp4"; // Import your video

export function Login() {
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    const loading = useSelector((state: any) => state.user.loading); // Track loading state
    const error = useSelector((state: any) => state.user.error); // Capture error message
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllUsers()); // Fetch all users on mount
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("is authenticated",isAuthenticated)
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        dispatch(loginUser({ phoneNumber: username, password }));
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0">
                <video autoPlay loop muted className="w-full h-full object-cover" style={{ opacity: 0.6 }}>
                    <source src={loginVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex justify-center items-center h-full">
                <div className="bg-gray-800 bg-opacity-50 rounded-3xl p-8 w-full max-w-md">
                    <div className="mb-6">
                        <h2 className="text-4xl font-semibold text-white text-center">Login</h2>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 text-sm">Username</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full bg-gray-700 text-white rounded"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm">Password</label>
                            <input
                                type="password"
                                className="mt-1 p-2 w-full bg-gray-700 text-white rounded"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                disabled={loading} // Disable the button while loading
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500"
                            >
                                Create Account
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
