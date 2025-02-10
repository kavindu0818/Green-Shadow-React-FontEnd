import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { saveCrop} from "../../redux/CropSlice";
import { CropModel } from "../../model/CropModel";
import CropInputModel from "../../commponet/crop/CropInputModel.tsx";
import {AppDispatch} from "../../store/store.tsx";
// import {Field} from "../../pages/Field.tsx";
import {getAllFields} from "../../redux/FieldSlice.ts";

export function AddCrop({ onClose }: { onClose: () => void }) {
    const [cropCode, setCropCode] = useState("");
    const [cropName, setCropName] = useState("");
    const [cropScientificName, setCropScientificName] = useState("");
    const [cropCategory, setCropCategory] = useState("");
    const [fieldCode, setCropField] = useState("");
    const [cropSeason, setCropSeason] = useState("");
    const [cropImage, setCropImage] = useState<File | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Create a new CropModel instance
            const cropModel = new CropModel(
                cropCode,
                cropName,
                cropScientificName,
                cropCategory,
                cropSeason,
                cropImage,
                fieldCode,
            );

            // Dispatch the saveCrop action
            dispatch(saveCrop(cropModel))
                .then(() => {
                    dispatch(getAllFields()); // Reload fields after saving a crop
                });

            // Reset state
            setCropCode("");
            setCropName("");
            setCropScientificName("");
            setCropCategory("");
            setCropField("");
            setCropSeason("");
            setCropImage(null);

            // Close modal after submission
            onClose();
        } catch (error) {
            console.error("Error creating CropModel:", error);
        }
    };


    const closeModal = () => {
        onClose();
    };

    return (

        <div
            id="cropForm"
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <h1 className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-5xl font-bold">
                ADD CROP
            </h1>
            <form
                className="flex flex-wrap gap-5 w-[75vw] h-[360px] rounded-[20px] shadow-lg bg-gray-300 p-6 relative"
                onSubmit={handleSubmit}
            >
                {/* "ADD CROP" Title */}


                {/* Input fields from CropInputModel */}
                <CropInputModel
                    setCropCode={setCropCode}
                    setCropName={setCropName}
                    setCropScientificName={setCropScientificName}
                    setCropCategory={setCropCategory}
                    setCropSeason={setCropSeason}
                    setCropImage={setCropImage}
                    setCropField={setCropField}
                />

                {/* Clear Button */}
                <button
                    type="button"
                    id="cleBtn"
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
                    id="subBtn"
                    className="absolute left-[62vw] top-[320px] w-[8vw] bg-black text-white rounded-lg font-bold hover:bg-transparent hover:text-black border border-black"
                >
                    Submit
                </button>

                {/* Close Icon */}
                <span
                    className="absolute top-4 right-6 text-2xl cursor-pointer"
                    onClick={closeModal}
                >
                    &times;
                </span>
            </form>
        </div>
    );
}

export default AddCrop;
