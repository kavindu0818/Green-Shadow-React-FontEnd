import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { UserModel } from "../../model/UserModel.ts";
import { saveUser } from "../../redux/UserSlice.ts";

interface UserSignupProps {
    onSignup: (userData: any) => void;
    onSwitch: () => void;
}

export function UserSignup({ onSwitch }: UserSignupProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from submitting normally

        try {
            const userModel = new UserModel(phoneNumber,username, password, role );
            dispatch(saveUser(userModel));

            console.log(userModel);

            // Reset fields after submission
            setUsername("");
            setPassword("");
            setRole("");
            setPhoneNumber("");
        } catch (error) {
            console.error("Error while signing up:", error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-8 bg-white bg-opacity-80 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="w-4/5 flex flex-col">
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                    Sign Up
                </button>
            </form>
            <button onClick={onSwitch} className="w-full text-sm text-gray-500 mt-2">
                Already have an account? Login
            </button>
        </div>
    );
}

export default UserSignup;
