import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import {deleteStaff, getAllStaffs} from "../redux/StaffSlice.ts";
import { StaffModel } from "../model/StaffModel.ts";
import UpdateStaff from "../commponet/staff/UpdateStaff.tsx";
import AddStaff from "../commponet/staff/AddStaff.tsx";
import {AppDispatch} from "../store/store.tsx";

export function Staffe() {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [staffToEdit, setStaffToEdit] = useState<StaffModel | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<StaffModel | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const staffModels: StaffModel[] = useSelector((state: any) => state.field); // Redux selector for crops

    useEffect(() => {
        dispatch(getAllStaffs()); // Fetch latest field data
    }, [dispatch, staffModels]); // Re-fetch whenever fieldModels updates


    useEffect(() => {
        dispatch(getAllStaffs());
    }, [dispatch]);

    const handleViewClick = (staff: StaffModel) => {
        setSelectedStaff(staff);
        setIsViewModalOpen(true);
    };

    const closeModal = () => {
        setIsViewModalOpen(false);
        setSelectedStaff(null);
    };

    const handleEditClick = (staff: StaffModel) => {
        setStaffToEdit(staff);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = (staffCode: string) => {
        dispatch(deleteStaff(staffCode));
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const filteredStaff = staffModels.filter((staff) =>
        staff.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>

            <section>
                <button
                    type="button"
                    className="right-10 w-40 h-10 top-20 text-white absolute bg-green-950 hover:bg-transparent hover:text-black hover:border-4 transition"
                    id="staff_add_btn"
                    onClick={handleAddClick}
                >
                    +ADD STAFF
                </button>
            </section>


            <section id="viewDetails" className="block">
                <section
                    id="search"
                    className="absolute left-[18vw] w-[80vw] h-[70px] bg-gray-400 top-[170px] rounded-lg"
                >
                    <label className="absolute left-[1vw] font-sans font-bold">
                        Search Staff
                    </label>
                    <input
                        placeholder="Enter staff name"
                        className="absolute top-[25px] w-[20vw] left-[1vw] rounded-lg border border-gray-300 px-3 py-1 focus:outline-none focus:ring focus:ring-gray-500"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </section>
            </section>

            {/* Table */}
            <section id="staffTable" className="p-4">
                <table className="w-4/5 left-56 top-64 table-auto border-collapse border border-gray-300 absolute">
                    <thead>
                    <tr className="bg-green-950 text-white">
                        <th className="p-2 border border-gray-400">Staff ID</th>
                        <th className="p-2 border border-gray-400">Name</th>
                        <th className="p-2 border border-gray-400">Contact</th>
                        <th className="p-2 border border-gray-400">Designation</th>
                        <th className="p-2 border border-gray-400">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStaff.length > 0 ? (
                        filteredStaff.map((staff) => (
                        <tr
                            key={staff.staffCode}
                            className="text-lg font-medium text-black"
                        >
                            <td className="p-2 border border-gray-400">{staff.staffCode}</td>
                            <td className="p-2 border border-gray-400">
                                {staff.firstName + " " + staff.lastName}
                            </td>
                            <td className="p-2 border border-gray-400">{staff.contact}</td>
                            <td className="p-2 border border-gray-400">{staff.designation}</td>
                            <td className="p-2 border border-gray-400">
                                <button
                                    type="button"
                                    className="border-2 border-blue-500 text-black px-4 py-1 rounded hover:bg-blue-200"
                                    onClick={() => handleViewClick(staff)}
                                >
                                    View
                                </button>
                                <button
                                    type="button"
                                    className="border-2 border-yellow-400 text-black px-4 py-1 ml-2 rounded hover:bg-yellow-600"
                                    onClick={() => handleEditClick(staff)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="border-2 border-red-500 px-4 py-1 ml-2 rounded hover:bg-red-500 text-white"
                                    onClick={() => handleDeleteClick(staff.staffCode)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-2">No staffs found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>

            {/* Modals */}
            {isUpdateModalOpen && staffToEdit && (
                <UpdateStaff
                    staffToEdit={staffToEdit}
                    onClose={() => setIsUpdateModalOpen(false)}
                />
            )}

            {isAddModalOpen && <AddStaff onClose={() => setIsAddModalOpen(false)} />}

            {isViewModalOpen && selectedStaff && (
                <div
                    id="viewModal"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="relative w-[50vw] h-[85vh] bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
                        <span
                            className="absolute top-2 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 cursor-pointer"
                            onClick={closeModal}
                        >
                            &times;
                        </span>
                        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
                            Staff Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selectedStaff).map(([key, value]) => (
                                <p key={key} className="font-normal text-gray-600">
                                    <span className="font-semibold">{key}: </span>
                                    {value || "N/A"}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
