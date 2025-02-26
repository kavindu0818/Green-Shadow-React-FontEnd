import React from "react";
import UserInputModel from "./UserInputModel.tsx";

export function UserLogin({ username, setUsername, password, setPassword, handleLogin }) {
    return (
        <div className="w-full -top-0 flex  flex-col justify-center items-center relative">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLogin} className="w-4/5 flex flex-col">
                <UserInputModel
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
                <button type="submit" className="w-32 absolute left-16 top-40 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                    Login
                </button>

            </form>
        </div>
    );
}

export default UserLogin;
