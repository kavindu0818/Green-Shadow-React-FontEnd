import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {updateCrop} from "../../redux/CropSlice"; // Ensure this action is defined
import {CropModel} from "../../model/CropModel"; // Ensure this is the correct path
import CropInputModel from "./CropInputModel.tsx";
import {AppDispatch} from "../../store/store.tsx";

interface UpdateCropProps {
    cropToEdit: CropModel | null; // Crop to be edited (passed dynamically)
    onClose: () => void; // Function to close the modal
}



const UpdateCrop: React.FC<UpdateCropProps> = ({cropToEdit, onClose}) => {
    const [cropCode, setCropCode] = useState("");
    const [cropName, setCropName] = useState("");
    const [cropScientificName, setCropScientificName] = useState("");
    const [cropCategory, setCropCategory] = useState("");
    const [fieldCode, setCropField] = useState("");
    const [cropSeason, setCropSeason] = useState("");
    const [cropImage, setCropImage] = useState<File | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    // Debug: Ensure cropToEdit is valid before logging or using it
    useEffect(() => {
        console.log(cropToEdit?.cropCode || "No crop selected");
    }, [cropToEdit]);

    // Pre-fill the fields when a crop is passed for editing
    useEffect(() => {
        if (cropToEdit) {
            setCropCode(cropToEdit.cropCode);
            setCropName(cropToEdit.cropCommonName);
            setCropScientificName(cropToEdit.cropScientificName);
            setCropCategory(cropToEdit.cropCategory);
            setCropField(cropToEdit.fieldCode);
            setCropSeason(cropToEdit.cropSeason);
            setCropImage(null); // Handle images separately if required
        }
    }, [cropToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const cropModel = new CropModel(
                cropCode,
                cropName,
                cropScientificName,
                cropCategory,
                cropSeason,
                cropImage,
                fieldCode
            );

            // Dispatch update action
            dispatch(updateCrop(cropModel));
            onClose(); // Close modal after successful update
        } catch (error) {
            console.error("Error updating crop:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">

            <h1 className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-5xl font-bold">
                UPDATE CROP
            </h1>
            <form
                className="flex flex-wrap gap-5 w-[75vw] h-[360px] rounded-[20px] shadow-lg bg-gray-300 p-6 relative"
                onSubmit={handleSubmit}
            >


                {/* Input fields from CropInputModel */}
                <CropInputModel
                    cropCode={cropCode}
                    setCropCode={setCropCode}
                    cropName={cropName}
                    setCropName={setCropName}
                    cropScientificName={cropScientificName}
                    setCropScientificName={setCropScientificName}
                    cropCategory={cropCategory}
                    setCropCategory={setCropCategory}
                    cropSeason={cropSeason}
                    setCropSeason={setCropSeason}
                    cropImage={cropImage}
                    setCropImage={setCropImage}
                    cropField={fieldCode}
                    setCropField={setCropField}
                />

                {/* Clear Button */}
                <button
                    type="reset"
                    className="absolute left-[53vw] top-[320px] w-[8vw] bg-transparent rounded-lg font-bold border border-black hover:bg-black hover:text-white"
                    onClick={() => {
                        setCropCode("");
                        setCropName("");
                        setCropScientificName("");
                        setCropCategory("");
                        setCropField("");
                        setCropSeason("");
                        setCropImage(null);
                    }}
                >
                    Clear
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="absolute left-[62vw] top-[320px] w-[8vw] bg-black text-white rounded-lg font-bold hover:bg-transparent hover:text-black border border-black"
                >
                    Update
                </button>

                {/* Close Icon */}
                <span
                    className="absolute top-4 right-6 text-2xl cursor-pointer"
                    onClick={onClose}
                >
                    &times;
                </span>
            </form>
        </div>
    );
};

export default UpdateCrop;
