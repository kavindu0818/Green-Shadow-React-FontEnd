import {Navbar} from '../commponet/Navbar.tsx';
import {Outlet} from "react-router";

export function RootLayout() {
    return(
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    );
}