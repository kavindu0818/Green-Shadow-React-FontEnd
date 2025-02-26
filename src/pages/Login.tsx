import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserModel } from "../model/UserModel.ts";
import { AppDispatch } from "../store/store.ts";
import { getAllUsers } from "../redux/UserSlice.ts";
import loginVideo from "../Aseats/video/greenShadowVideo.mp4"; // Import your video

export function Login() {
    const userModel: UserModel[] = useSelector((state: any) => state.user.users);
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const foundUser = userModel.find(
            (user) => user.username === username && user.password === password
        );

        if (foundUser) {
            navigate("/dashboard");
        } else {
            setError("Invalid credentials");
        }
    };

    const handleSignup = (userData: any) => {
        console.log("User signed up:", userData);
        setIsSignup(false);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.6 }} // Adjust opacity for desired effect
                >
                    <source src={loginVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex justify-center items-center h-full">
                <div className="bg-gray-800 bg-opacity-50 rounded-3xl p-8 w-full max-w-md">
                    {/* Header Section */}
                    <div className="mb-6">
                        <h2 className="text-6xl font-semibold text-white text-center">

                        </h2>
                        <p className="text-gray-400 text-sm text-center">
                            {/*Already a member?*/}
                            <button onClick={() => setIsSignup(false)} className="text-blue-500 ml-1">

                            </button>
                        </p>
                    </div>
                    {/* Sign Up Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-gray-300 text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 w-full bg-gray-700 text-white rounded"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-gray-300 text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 w-full bg-gray-700 text-white rounded"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500"
                            >
                                LogIn
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Create account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
