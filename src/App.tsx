
import {createBrowserRouter, RouterProvider} from "react-router";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Crop} from "./pages/Crop";
import {Equipment} from "./pages/Equipment";
import {Field} from "./pages/Field";
import {MonitoringLog} from "./pages/MonitoringLog";
import {Staffe} from "./pages/Staffe";
import {Vehicle} from "./pages/Vehicle";
// import {React} from "react";
import {RootLayout} from "./commponet/RootLayout.tsx";
import React from "react";
import Login from "./pages/Login.tsx";

export function App() {

  const routes = createBrowserRouter([
    { path: "/", element: <Login /> },

    {
      path: '',
      element : <RootLayout/>,
      children : [
        { path : '/dashboard', element : <Dashboard/>},
        { path : '/crop', element : <Crop/>},
        { path : '/field', element : <Field/>},
        { path : '/Staff', element : <Staffe/>},
        { path : '/vehicle', element : <Vehicle/>},
        { path : '/equipment', element : <Equipment/>},
        { path : '/monitor', element : <MonitoringLog/>},


      ]
    },
  ])

  return (
      <>
        <RouterProvider router={routes} />
      </>
  );
}

export default App
