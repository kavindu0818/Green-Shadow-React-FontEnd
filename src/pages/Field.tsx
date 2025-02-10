import { FieldModel } from "../model/FieldModel.ts";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import {deleteField, getAllFields} from "../redux/FieldSlice.ts";
import AddField from "../commponet/field/AddField.tsx";
import UpdateField from "../commponet/field/UpdateField.tsx";
import { AppDispatch } from "../store/store.tsx";

export function Field() {
    const fieldModels: FieldModel[] = useSelector((state: any) => state.field); // Redux selector for crops
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState<FieldModel | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState<FieldModel | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllFields()); // Fetch latest field data
    }, [dispatch, fieldModels]); // Re-fetch whenever fieldModels updates


    useEffect(() => {
        dispatch(getAllFields());
    }, [dispatch]);

    const handleViewClick = (field: FieldModel) => {
        setSelectedField(field);
        setIsViewModalOpen(true);
    };

    const closeModal = () => {
        setIsViewModalOpen(false);
        setSelectedField(null);
    };

    const handleEditClick = (field: FieldModel) => {
        setFieldToEdit(field);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = (fieldCode: string) => {
        dispatch(deleteField(fieldCode)); // Ensure the action expects a string
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    // Filter crops based on the search term (ensure toLowerCase is only called on strings)
    const filteredField = fieldModels.filter(
        (fieldItem) =>
            fieldItem.fieldName &&
            typeof fieldItem.fieldName === "string" &&
            fieldItem.fieldName.toLowerCase().includes(searchTerm.toLowerCase())
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
                    +ADD CROP
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
                        <th className="p-2 border border-gray-400">Field Code</th>
                        <th className="p-2 border border-gray-400">Field Name</th>
                        <th className="p-2 border border-gray-400">Image</th>
                        <th className="p-2 border border-gray-400">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredField.length > 0 ? (
                        filteredField.map((field) => (
                            <tr key={field.fieldCode} className="text-lg font-medium text-gray-900">
                                <td className="p-2 border border-gray-400">{field.fieldCode}</td>
                                <td className="p-2 border border-gray-400">{field.fieldName}</td>
                                <td className="p-2 border border-gray-400">
                                    {field.fieldImage && typeof field.fieldImage === 'string' && field.fieldImage.trim() !== "" ? (
                                        <img
                                            src={field.fieldImage}
                                            className="w-16 h-16 object-cover rounded-md"
                                            alt={field.fieldName || "Field Image"}
                                        />
                                    ) : (
                                        <img
                                            src="https://via.placeholder.com/64"
                                            className="w-16 h-16 object-cover rounded-md"
                                            alt="Placeholder"
                                        />
                                    )}
                                </td>
                                <td className="p-2 border border-gray-400 text-center">
                                    <button
                                        type="button"
                                        className="border-2 border-blue-950 text-black px-4 py-1 rounded hover:bg-blue-200"
                                        onClick={() => handleViewClick(field)}
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        className="border-2 border-yellow-400 text-black px-4 py-1 ml-2 rounded hover:bg-yellow-600"
                                        onClick={() => handleEditClick(field)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="border-2 border-red-800 px-4 py-1 ml-2 rounded hover:bg-red-800 transition"
                                        onClick={() => handleDeleteClick(field.fieldCode)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-2">No crops found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>

            {isUpdateModalOpen && fieldToEdit && (
                <UpdateField fieldToEdit={fieldToEdit} onClose={() => setIsUpdateModalOpen(false)} />
            )}

            {isAddModalOpen && <AddField onClose={() => setIsAddModalOpen(false)} />}

            {isViewModalOpen && selectedField && (
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
                                <p className="font-semibold text-gray-700">Field Code:</p>
                                <p className="font-semibold text-gray-700">Field Name:</p>
                                <p className="font-semibold text-gray-700">Field Location:</p>
                                <p className="font-semibold text-gray-700">Field Size:</p>
                                <p className="font-semibold text-gray-700">Images:</p>
                            </div>
                            <div className="space-y-4 left-80 absolute">
                                <p id="cropCode" className="font-normal text-gray-600">
                                    {selectedField?.fieldCode}
                                </p>
                                <p id="comName" className="font-normal text-gray-600">
                                    {selectedField?.fieldName}
                                </p>
                                <p id="csiName" className="font-normal text-gray-600">
                                    {selectedField?.fieldLocation || "N/A"}
                                </p>
                                <p id="cropCat" className="font-normal text-gray-600">
                                    {selectedField?.fieldSize}
                                </p>
                                <div id="imageView">
                                    <img
                                        id="croImage"
                                        src={selectedField?.fieldImage || "https://via.placeholder.com/150"}
                                        alt={selectedField?.fieldName || "Crop Image"}
                                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
