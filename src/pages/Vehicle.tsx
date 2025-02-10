import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {VehicleModel} from "../model/VehicleModel.ts";
import UpdateVehicle from "../commponet/vehicle/UpdateVehicle.tsx";
import AddVehicle from "../commponet/vehicle/AddVehicle.tsx";
import {deleteVehicle} from "../redux/VehicleSlice.ts";

export function Vehicle() {

    const vehicleModels: VehicleModel[] = useSelector((state: any) => state.vehicle); // Redux selector for crops
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [vehicleToEdit, setCropToEdit] = useState<VehicleModel | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(null);
    const dispatch = useDispatch();


    const handleViewClick = (vehicle: VehicleModel) => {
        setSelectedVehicle(vehicle);
        setIsViewModalOpen(true);
    };

    const closeModal = () => {
        setIsViewModalOpen(false);
        setSelectedVehicle(null);
    };

    const handleEditClick = (crop: VehicleModel) => {
        setCropToEdit(crop);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick =(vehicleCode) => {
        dispatch(deleteVehicle(vehicleCode));
    }

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const filteredVehicle = vehicleModels.filter((vehicle) =>
        vehicle.licensePlateNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
                    +ADD VEHICLE
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
                <table className="w-4/5 left-56 top-64 table-auto border-collapse border border-gray-300 absolute">
                    <thead>
                    <tr className="bg-green-950 text-white">
                        <th className="p-2 border border-gray-400">Vehicle Code</th>
                        <th className="p-2 border border-gray-400">License Plate Number</th>
                        <th className="p-2 border border-gray-400">Category</th>
                        <th className="p-2 border border-gray-400">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredVehicle.map((vehicle) => (
                        <tr
                            key={vehicle.vehicleCode}
                            className="text-lg font-medium text-gray-900"
                        >
                            <td className="p-2 border border-gray-400 text-center">{vehicle.vehicleCode}</td>
                            <td className="p-2 border border-gray-400 text-center">
                                {vehicle.licensePlateNumber}
                            </td>

                            <td className="p-2 border border-gray-400 text-center">{vehicle.vehicleCategory}</td>
                            <td className="p-2 border border-gray-400 text-center">
                                <button
                                    type="button"
                                    className="border-2 border-blue-950 text-black px-4 py-1 rounded hover:bg-blue-200"
                                    onClick={() => handleViewClick(vehicle)}
                                >
                                    View
                                </button>
                                <button
                                    type="button"
                                    className="border-2 border-yellow-400 text-black px-4 py-1 ml-2 rounded hover:bg-yellow-600"
                                    onClick={() => handleEditClick(vehicle)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="border-2 border-red-800 px-4 py-1 ml-2 rounded hover:bg-red-800 transition"
                                    onClick={()=> handleDeleteClick(vehicle.vehicleCode)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {isUpdateModalOpen && vehicleToEdit && (
                <UpdateVehicle
                    vehicleToEdit={vehicleToEdit}
                    onClose={() => setIsUpdateModalOpen(false)}
                />
            )}

            {isAddModalOpen && <AddVehicle onClose={() => setIsAddModalOpen(false)}/>}

            {isViewModalOpen && selectedVehicle && (
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
                            CROP DETAILS
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 left-44 absolute">
                                <p className="font-semibold text-gray-700">Vehicle Code:</p>
                                <p className="font-semibold text-gray-700">License Plate Number:</p>
                                <p className="font-semibold text-gray-700">Vehicle Category:</p>
                                <p className="font-semibold text-gray-700">Fuel Type:</p>
                                <p className="font-semibold text-gray-700">Remake:</p>
                                <p className="font-semibold text-gray-700">Staff Member Details:</p>
                                <p className="font-semibold text-gray-700">Status:</p>
                            </div>
                            <div className="space-y-4 left-80 absolute">
                                <p id="cropCode" className="font-normal text-gray-600">
                                    {selectedVehicle?.vehicleCode}
                                </p>
                                <p id="comName" className="font-normal text-gray-600">
                                    {selectedVehicle?.licensePlateNumber}
                                </p>
                                <p id="csiName" className="font-normal text-gray-600">
                                    {selectedVehicle?.vehicleCategory || "N/A"}
                                </p>
                                <p id="cropCat" className="font-normal text-gray-600">
                                    {selectedVehicle?.fuelType}
                                </p>
                                <p id="cropSeason" className="font-normal text-gray-600">
                                    {selectedVehicle?.remake || "N/A"}
                                </p>
                                <p id="cropField" className="font-normal text-gray-600">
                                    {selectedVehicle?.staffMemberDetails || "N/A"}
                                </p>
                                <p id="cropField" className="font-normal text-gray-600">
                                    {selectedVehicle?.status || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}