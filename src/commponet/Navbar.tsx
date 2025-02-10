import DashIcon from '../Aseats/monitorIcon.png';
import CropIcon from '../Aseats/cropsIcon.png';
import FieldIcon from '../Aseats/fieldIcon.png';
import StaffIcon from '../Aseats/staffe.png';
import VehicleIcon from '../Aseats/vehicelLogo.png';
import EquipmentIcon from '../Aseats/equipementIcon.png';
import MonitorIcon from '../Aseats/monitorIcon.png';
import { Link } from "react-router-dom"; // Keep only one Link import
import GreenLogo from '../Aseats/Green_Shadow_Logo.png';
import Calender from '../Aseats/calendar.png';

export function Navbar() {
    return (
        <>
            <nav
                className="min-h-screen w-2/12 p-4 bg-green-950 flex flex-col items-center justify-between border-r-8 bottom-0.5 absolute">
                <img src={GreenLogo} className="absolute min-w-48 max-h-40 -top-6" alt="Green Shadow Logo" />
                <ul className="space-y-4 text-white flex flex-col absolute left-8 top-28">
                    {/** Dashboard */}
                    <li>
                        <Link to="/dashboard" className="flex items-center space-x-2 group">
                            <img
                                src={DashIcon}
                                className="w-9 h-9 bg-white p-2 rounded-full"
                                alt="Dashboard Icon"
                            />
                            <span className="transition-opacity duration-300 text-white font-bold">Dashboard</span>
                        </Link>
                    </li>

                    {/** Crop */}
                    <li>
                        <Link to="/Crop" className="flex items-center space-x-2 group">
                            <img
                                src={CropIcon}
                                className="w-9 h-9 bg-white p-2 rounded-full"
                                alt="Crop Icon"
                            />
                            <span className="transition-opacity duration-300 text-white font-bold">Crop</span>
                        </Link>
                    </li>

                    {/** Field */}
                    <li>
                        <Link to="/Field" className="flex items-center space-x-2 group">
                            <img
                                src={FieldIcon}
                                className="w-9 h-9 bg-white p-2 rounded-full"
                                alt="Field Icon"
                            />
                            <span className="transition-opacity duration-300 text-white font-bold">Field</span>
                        </Link>
                    </li>

                    {/** Staff */}
                    <li>
                        <Link to="/Staff" className="flex items-center space-x-2 group">
                            <img
                                src={StaffIcon}
                                className="w-9 h-9 bg-white p-2 rounded-full"
                                alt="Staff Icon"
                            />
                            <span className="transition-opacity duration-300 text-white font-bold">Staff</span>
                        </Link>
                    </li>

                    {/** Vehicle */}
                    <li>
                        <Link to="/Vehicle" className="flex items-center space-x-2 group">
                            <img
                                src={VehicleIcon}
                                className="w-9 h-9 bg-white p-2 rounded-full"
                                alt="Vehicle Icon"
                            />
                            <span className="transition-opacity duration-300 text-white font-bold">Vehicle</span>
                        </Link>
                    </li>

                    {/** Equipment */}
                    <li>
                        <Link to="/Equipment" className="flex items-center space-x-2 group">
                            <img
                                src={EquipmentIcon}
                                className="w-9 h-9 bg-white p-2 rounded-full"
                                alt="Equipment Icon"
                            />
                            <span className="transition-opacity duration-300 text-white font-bold">Equipment</span>
                        </Link>
                    </li>

                    {/** Monitor Log */}
                    <li>
                        <Link to="/Monitor Log" className="flex items-center space-x-2 group">
                            <img
                                src={MonitorIcon}
                                className="w-9 h-9 bg-white p-2 rounded-full"
                                alt="Monitor Log Icon"
                            />
                            <span className="transition-opacity duration-300 text-white font-bold">Monitor Log</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <section
                id="borderNav"
                className="fixed top-0 left-[16vw] w-[85vw] h-[50px] bg-white border-b border-black flex items-center shadow-sm"
            >
                <div
                    id="userImg"
                    className="absolute right-[10vw] top-[5px] w-[3vw] h-[40px] bg-white border border-black rounded-full"
                ></div>

                <h3 id="userName" className="absolute right-[1vw] top-[10px] text-lg font-bold text-black">
                    Kavindu Mw
                </h3>

                <h2
                    id="borderTopic"
                    className="absolute left-[1vw] top-[15px] text-sm font-bold text-[#092b0e]"
                >
                    GREEN SHADOW (PVT)LTD
                </h2>

                <img
                    src={Calender}
                    alt="Calendar"
                    id="calendarView"
                    className="absolute left-[41vw] top-[10px] w-[2vw] h-[30px] bg-white shadow-lg"
                />

                <div
                    id="viewDateAndTime"
                    className="absolute left-[45vw] top-[10px] w-[24vw] h-[30px] rounded-lg shadow-lg font-bold text-sm flex items-center"
                >
                    <div id="viewDateAndTimeBack" className="ml-[5px]">
                        <label id="viewDay" className="mr-2">
                            Wednesday
                        </label>
                        <label id="viewDate" className="mr-2">
                            17 November 2024
                        </label>
                        <label id="atlbl" className="mx-1">
                            at
                        </label>
                        <label id="time">8.00 AM</label>
                    </div>
                </div>
            </section>
        </>
    );
}
