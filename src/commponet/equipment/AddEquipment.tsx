import React, {useState} from "react";
import {useDispatch} from "react-redux";
import EquipmentModel from "../../model/EquipmentModel.ts";
import {saveEquipment} from "../../redux/EquipmentSlice.ts";
import EquipmentInputModel from "./EquipmentInputModel.tsx";
import {AppDispatch} from "../../store/store.tsx";

export function AddEquipment({ onClose }: { onClose: () => void }) {
    const [equipCode, setEquipCode] = useState("");
    const [equipName, setEquipName] = useState("");
    const [equipType, setEquipType] = useState("");
    const [equipStatus, setEquipStatus] = useState("");
    const [staffCode, setStaffCode] = useState("");
    const [fieldCode, setFieldCode] = useState("");


    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Create a new CropModel instance
            const equipmentModel = new EquipmentModel(
                equipCode,
                equipName,
                equipType,
                equipStatus,
                staffCode,
                fieldCode
            );


            // Dispatch the addCrop action
            dispatch(saveEquipment(equipmentModel));

            // Reset state
            setEquipCode("");
            setEquipName("");
            setEquipType("");
            setEquipStatus("");
            setStaffCode("");
            setFieldCode("");

            // Close modal after submission
            onClose();
        } catch (error) {
            console.error("Error creating EquipmentModel:", error);
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
                ADD EQUIPMENT
            </h1>
            <form
                className="flex flex-wrap gap-5 w-[75vw] h-[360px] rounded-[20px] shadow-lg bg-gray-300 p-6 relative"
                onSubmit={handleSubmit}
            >
                {/* "ADD CROP" Title */}


                {/* Input fields from CropInputModel */}
                <EquipmentInputModel
                    setEquipCode={setEquipCode}
                    setEquipName={setEquipName}
                    setEquipType={setEquipType}
                    setEquipStatus={setEquipStatus}
                    setStaffCode={setStaffCode}
                    setFieldCode={setFieldCode}
                />


                {/* Clear Button */}
                <button
                    type="button"
                    id="cleBtn"
                    className="absolute left-[53vw] top-[320px] w-[8vw] bg-transparent rounded-lg font-bold border border-black hover:bg-black hover:text-white"
                    onClick={() => {
                        setEquipCode("");
                        setEquipName("");
                        setEquipType("");
                        setEquipStatus("");
                        setStaffCode("");
                        setFieldCode("");
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
export default AddEquipment;