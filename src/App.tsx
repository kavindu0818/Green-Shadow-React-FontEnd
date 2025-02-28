import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Crop } from "./pages/Crop";
import { Equipment } from "./pages/Equipment";
import { Field } from "./pages/Field";
import { MonitoringLog } from "./pages/MonitoringLog";
import { Staffe } from "./pages/Staffe";
import { Vehicle } from "./pages/Vehicle";
import { RootLayout } from "./commponet/RootLayout.tsx";
import Login from "./pages/Login.tsx";
import UserSignup from "./commponet/user/UserAdd.tsx"; // Import Signup Page
import React from "react";

export function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <UserSignup /> },
    { path: "/login", element: <Login /> }, // ✅ Fixed route definition

    {
      path: "",
      element: <RootLayout />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/crop", element: <Crop /> },
        { path: "/field", element: <Field /> },
        { path: "/staff", element: <Staffe /> },
        { path: "/vehicle", element: <Vehicle /> },
        { path: "/equipment", element: <Equipment /> },
        { path: "/monitor", element: <MonitoringLog /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
