import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store.tsx";
import { saveUser } from "../../redux/UserSlice.ts";
import loginVideo from "../../Aseats/video/greenShadowVideo.mp4"; // Import your video

export function UserSignup() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = { phoneNumber, username, password, role };

        console.log("mama new user bn",newUser);
        dispatch(saveUser(newUser));

        // Reset fields
        setPhoneNumber("");
        setUsername("");
        setPassword("");
        setRole("");

        navigate("/login");
    };

    return (
        <div className="fixed inset-0 overflow-hidden flex items-center justify-center">
            {/* Background Video */}
            <div className="absolute inset-0">
                <video autoPlay loop muted className="w-full h-full object-cover" style={{ opacity: 0.6 }}>
                    <source src={loginVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-md bg-gray-800 bg-opacity-50 rounded-3xl p-8">
                <h2 className="text-4xl font-semibold text-white text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <div>
                        <label className="block text-gray-300 text-sm">Phone Number</label>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full bg-gray-700 text-white rounded"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
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
                    <div>
                        <label className="block text-gray-300 text-sm">Role</label>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full bg-gray-700 text-white rounded"
                            placeholder="Enter Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Sign Up
                    </button>
                </form>
                <button onClick={() => navigate("/login")} className="w-full text-sm text-gray-300 mt-4">
                    Already have an account? Login
                </button>
            </div>
        </div>
    );
}

export default UserSignup;
