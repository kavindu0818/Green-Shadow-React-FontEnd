import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CropModel } from "../model/CropModel.ts";
import UpdateCrop from "../commponet/crop/UpdateCrop.tsx";
import AddCrop from "../commponet/crop/AddCrop.tsx";
import { deleteCrop, getAllCrops } from "../redux/CropSlice.ts";
import { AppDispatch } from "../store/store.tsx";
import Alert from "../alert/Alert.tsx"; // Import the Alert component

export function Crop() {
    const dispatch = useDispatch<AppDispatch>();
    const crop: CropModel[] = useSelector((state: any) => state.crop || []);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [cropToEdit, setCropToEdit] = useState<CropModel | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState<CropModel | null>(null);
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        dispatch(getAllCrops());
    }, [dispatch]);

    const handleViewClick = (crop: CropModel) => {
        setSelectedCrop(crop);
        setIsViewModalOpen(true);
    };

    const closeModal = () => {
        setIsViewModalOpen(false);
        setSelectedCrop(null);
    };

    const handleEditClick = (crop: CropModel) => {
        setCropToEdit(crop);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = async (cropCode: string) => {
        const resultAction = await dispatch(deleteCrop(cropCode));

        if (deleteCrop.fulfilled.match(resultAction)) {
            setAlert({ message: "Crop deleted successfully.", type: 'success' });
        } else {
            setAlert({ message: "Failed to delete crop: " + resultAction.payload, type: 'error' });
        }
    };

    const closeAlert = () => {
        setAlert(null);
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const filteredCrops = crop.filter((cropItem) =>
        cropItem.cropCommonName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}

            <section>
                <button
                    type="button"
                    className="absolute right-10 w-40 h-10 top-20 text-white bg-green-950 hover:bg-transparent hover:text-black border-2 border-transparent hover:border-green-950 transition"
                    onClick={handleAddClick}
                >
                    + ADD CROP
                </button>
            </section>

            <section id="viewDetails" className="block">
                <section
                    id="search"
                    className="absolute left-[18vw] w-[80vw] h-[70px] bg-gray-400 top-[170px] rounded-lg"
                >
                    <label className="absolute left-[1vw] font-sans font-bold">
                        Search Crop
                    </label>
                    <input
                        placeholder="Enter crop name"
                        className="absolute top-[25px] w-[20vw] left-[1vw] rounded-lg border border-gray-300 px-3 py-1 focus:outline-none focus:ring focus:ring-gray-500"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </section>
            </section>

            <section id="cropTable" className="p-4">
                <div className="w-4/5 left-56 top-64 absolute border border-gray-300 rounded-lg overflow-hidden">
                    <div className="max-h-[400px]">
                        <table className="w-full table-auto border-collapse border border-gray-300 overflow-y-auto">
                            <thead className="bg-green-950 text-white sticky top-0">
                            <tr>
                                <th className="p-2 border border-gray-400">Crop ID</th>
                                <th className="p-2 border border-gray-400">Crop Name</th>
                                <th className="p-2 border border-gray-400">Image</th>
                                <th className="p-2 border border-gray-400">Category</th>
                                <th className="p-2 border border-gray-400">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredCrops.length > 0 ? (
                                filteredCrops.map((cropItem) => (
                                    <tr key={cropItem.cropCode} className="text-lg font-medium text-gray-900 overflow-y-auto">
                                        <td className="p-2 border border-gray-400">{cropItem.cropCode}</td>
                                        <td className="p-2 border border-gray-400">{cropItem.cropCommonName}</td>
                                        <td className="p-2 border border-gray-400">
                                            <img
                                                src={cropItem.cropImage || "https://via.placeholder.com/64"}
                                                className="w-16 h-16 object-cover rounded-md"
                                                alt={cropItem.cropCommonName || "Crop Image"}
                                            />
                                        </td>
                                        <td className="p-2 border border-gray-400">{cropItem.cropCategory}</td>
                                        <td className="p-2 border border-gray-400 space-x-2">
                                            <button
                                                className="border-2 border-blue-950 text-black px-4 py-1 rounded hover:bg-blue-200"
                                                onClick={() => handleViewClick(cropItem)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="border-2 border-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-600"
                                                onClick={() => handleEditClick(cropItem)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="border-2 border-red-800 px-4 py-1 rounded hover:bg-red-800 transition"
                                                onClick={() => handleDeleteClick(cropItem.cropCode)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">
                                        No crops found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {isUpdateModalOpen && cropToEdit && (
                <UpdateCrop cropToEdit={cropToEdit} onClose={() => setIsUpdateModalOpen(false)} />
            )}

            {isAddModalOpen && <AddCrop onClose={() => setIsAddModalOpen(false)} />}

            {isViewModalOpen && selectedCrop && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-[50vw] h-[85vh] bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
                        <button
                            className="absolute top-2 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">CROP DETAILS</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <p className="font-semibold text-gray-700">Code:</p>
                                <p className="font-semibold text-gray-700">Name:</p>
                                <p className="font-semibold text-gray-700">Scientific Name:</p>
                                <p className="font-semibold text-gray-700">Category:</p>
                                <p className="font-semibold text-gray-700">Crop Season:</p>
                                <p className="font-semibold text-gray-700">Field:</p>
                                <p className="font-semibold text-gray-700">Images:</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-600">{selectedCrop?.cropCode}</p>
                                <p className="text-gray-600">{selectedCrop?.cropCommonName}</p>
                                <p className="text-gray-600">{selectedCrop?.cropScientificName || "N/A"}</p>
                                <p className="text-gray-600">{selectedCrop?.cropCategory}</p>
                                <p className="text-gray-600">{selectedCrop?.cropSeason || "N/A"}</p>
                                <p className="text-gray-600">{selectedCrop?.fieldCode || "N/A"}</p>
                                <img
                                    src={selectedCrop?.cropImage || "https://via.placeholder.com/150"}
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                    alt={selectedCrop?.cropCommonName || "Crop Image"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
