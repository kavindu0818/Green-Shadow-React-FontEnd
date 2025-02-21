import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import EquipmentModel from "../model/EquipmentModel.ts";
import AddEquipment from "../commponet/equipment/AddEquipment.tsx";
import UpdateEquipment from "../commponet/equipment/UpdateEquipment.tsx";
import {deleteEquipment, getAllEquipment} from "../redux/EquipmentSlice.ts";
import {AppDispatch} from "../store/store.tsx";

export function Equipment() {
    const equipmentModels: EquipmentModel[] = useSelector((state: any) => state.equipment); // Use correct Redux slice
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [equipmentToEdit, setEquipmentToEdit] = useState<EquipmentModel | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentModel | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllEquipment()); // Fetch latest field data
    }, [dispatch, equipmentModels]); // Re-fetch whenever fieldModels updates


    useEffect(() => {
        dispatch(getAllEquipment());
    }, [dispatch]);

    const handleViewClick = (equipment: EquipmentModel) => {
        setSelectedEquipment(equipment);
        setIsViewModalOpen(true);
    };

    const closeModal = () => {
        setIsViewModalOpen(false);
        setSelectedEquipment(null);
    };

    const handleEditClick = (equipment: EquipmentModel) => {
        setEquipmentToEdit(equipment);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = (equipCode: string) => {
        dispatch(deleteEquipment(equipCode));
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const filteredEquipment = equipmentModels.filter((equipment) =>
        equipment.equipName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <section>
                <button
                    type="button"
                    className="right-10 w-40 h-10 top-20 text-white absolute bg-green-950 hover:bg-transparent hover:text-black hover:border-4 transition"
                    id="crop_Add_Btn"
                    onClick={handleAddClick}
                >
                    +ADD EQUIPMENT
                </button>
            </section>

            <section id="viewDetails" className="block">
                <section
                    id="search"
                    className="absolute left-[18vw] w-[80vw] h-[70px] bg-gray-400 top-[170px] rounded-lg"
                >
                    <label className="absolute left-[1vw] font-sans font-bold">
                        Search Equipment
                    </label>
                    <input
                        placeholder="Enter Equipment name"
                        className="absolute top-[25px] w-[20vw] left-[1vw] rounded-lg border border-gray-300 px-3 py-1 focus:outline-none focus:ring focus:ring-gray-500"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </section>
            </section>

            <section id="cropTable" className="p-4">
                <table className="w-4/5 left-56 top-64 table-auto border-collapse border border-gray-300 absolute">
                    <thead>
                    <tr className="bg-green-950 text-white">
                        <th className="p-2 border border-gray-400">Equipment Code</th>
                        <th className="p-2 border border-gray-400">Equipment Name</th>
                        <th className="p-2 border border-gray-400">Equipment Type</th>
                        <th className="p-2 border border-gray-400">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEquipment.map((equipment) => (

                        <tr
                            key={equipment.equipCode}
                            className="text-lg font-medium text-gray-900"
                        >
                            <td className="p-2 border border-gray-400">
                                {equipment.equipCode || "N/A"}
                            </td>
                            <td className="p-2 border border-gray-400">
                                {equipment.equipName || "N/A"}
                            </td>
                            <td className="p-2 border border-gray-400">
                                {equipment.equipType || "N/A"}
                            </td>
                            <td className="p-2 border border-gray-400">
                                <button
                                    type="button"
                                    className="border-2 border-blue-950 text-black px-4 py-1 rounded hover:bg-blue-200"
                                    onClick={() => handleViewClick(equipment)}
                                >
                                    View
                                </button>
                                <button
                                    type="button"
                                    className="border-2 border-yellow-400 text-black px-4 py-1 ml-2 rounded hover:bg-yellow-600"
                                    onClick={() => handleEditClick(equipment)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="border-2 border-red-800 px-4 py-1 ml-2 rounded hover:bg-red-800 transition"
                                    onClick={() => handleDeleteClick(equipment.equipCode)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </section>

            {isUpdateModalOpen && equipmentToEdit && (
                <UpdateEquipment
                    equipmentToEdit={equipmentToEdit}
                    onClose={() => setIsUpdateModalOpen(false)}
                />
            )}

            {isAddModalOpen && <AddEquipment onClose={() => setIsAddModalOpen(false)} />}

            {isViewModalOpen && selectedEquipment && (
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
                            EQUIPMENT DETAILS
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <p className="font-semibold text-gray-700">Equipment Code:</p>
                                <p className="font-semibold text-gray-700">Equipment Name:</p>
                                <p className="font-semibold text-gray-700">Equipment Type:</p>
                                <p className="font-semibold text-gray-700">Equipment Status:</p>
                                <p className="font-semibold text-gray-700">Staff Code:</p>
                                <p className="font-semibold text-gray-700">Field Code:</p>
                            </div>
                            <div className="space-y-4">
                                <p className="font-normal text-gray-600">
                                    {selectedEquipment?.equipCode || "N/A"}
                                </p>
                                <p className="font-normal text-gray-600">
                                    {selectedEquipment?.equipName || "N/A"}
                                </p>
                                <p className="font-normal text-gray-600">
                                    {selectedEquipment?.equipType || "N/A"}
                                </p>
                                <p className="font-normal text-gray-600">
                                    {selectedEquipment?.equipStatus || "N/A"}
                                </p>
                                <p className="font-normal text-gray-600">
                                    {selectedEquipment?.staffCode || "N/A"}
                                </p>
                                <p className="font-normal text-gray-600">
                                    {selectedEquipment?.fieldCode || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
