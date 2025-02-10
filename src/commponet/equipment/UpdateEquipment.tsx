import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import EquipmentModel from "../../model/EquipmentModel.ts";
import {updateEquipment} from "../../redux/EquipmentSlice.ts";
import EquipmentInputModel from "./EquipmentInputModel.tsx";

interface UpdateEquipmentProps {
    equipmentToEdit: EquipmentModel | null; // Crop to be edited (passed dynamically)
    onClose: () => void; // Function to close the modal
}
const UpdateEquipment: React.FC<UpdateEquipmentProps> = ({equipmentToEdit, onClose}) => {
    const [equipCode, setEquipCode] = useState("");
    const [equipName, setEquipName] = useState("");
    const [equipType, setEquipType] = useState("");
    const [equipStatus, setEquipStatus] = useState("");
    const [staffCode, setStaffCode] = useState("");
    const [fieldCode, setFieldCode] = useState("");


    const dispatch = useDispatch();

    // Debug: Ensure cropToEdit is valid before logging or using it
    useEffect(() => {
        console.log(equipmentToEdit?.equipCode || "No crop selected");
    }, [equipmentToEdit]);

    // Pre-fill the fields when a crop is passed for editing
    useEffect(() => {
        if (equipmentToEdit) {
            setEquipCode(equipmentToEdit.equipCode);
            setEquipName(equipmentToEdit.equipName);
            setEquipType(equipmentToEdit.equipType);
            setEquipStatus(equipmentToEdit.equipStatus);
            setStaffCode(equipmentToEdit.staffCode);
            setFieldCode(equipmentToEdit.fieldCode);
        }
    }, [equipmentToEdit]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedEquipment = new EquipmentModel(
                equipCode,
                equipName,
                equipType,
                equipStatus,
                staffCode,
                fieldCode
            );

            console.log("mama Awooooooo" + updatedEquipment.equipCode,updatedEquipment.equipName,updatedEquipment.equipType,updatedEquipment.equipStatus);

            // Dispatch update action
            dispatch(updateEquipment(updatedEquipment));
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
                <EquipmentInputModel
                    equipCode={equipCode}
                    setEquipCode={setEquipCode}
                    equipName={equipName}
                    setEquipName={setEquipName}
                    equipType={equipType}
                    setEquipType={setEquipType}
                    equipStatus={equipStatus}
                    setEquipStatus={setEquipStatus}
                    staffCode={staffCode}
                    setStaffCode={setStaffCode}
                    fieldCode={fieldCode}
                    setFieldCode={setFieldCode}
                />

                {/* Clear Button */}
                <button
                    type="reset"
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

export default UpdateEquipment;
