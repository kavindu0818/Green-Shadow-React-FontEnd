import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { VehicleModel } from "../../model/VehicleModel.ts";
import { updateVehicle } from "../../redux/VehicleSlice.ts";
import VehicleInputModel from "./VehicleInputModel.tsx";
import {AppDispatch} from "../../store/store.tsx";

interface UpdateVehicleProps {
    vehicleToEdit: VehicleModel; // Use the correct model type
    onClose: () => void;
}

const UpdateVehicle: React.FC<UpdateVehicleProps> = ({ vehicleToEdit, onClose }) => {
    const [vehicleCode, setVehicleCode] = useState("");
    const [licensePlateNumber, setLicensePlateNumber] = useState("");
    const [vehicleCategory, setVehicleCategory] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [staffMemberDetails, setStaffMemberDetails] = useState("");
    const [remark, setRemake] = useState("");
    const [status, setStatus] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    // Initialize state with the data from vehicleToEdit
    useEffect(() => {
        if (vehicleToEdit) {
            setVehicleCode(vehicleToEdit.vehicleCode || "");
            setLicensePlateNumber(vehicleToEdit.licensePlateNumber || "");
            setVehicleCategory(vehicleToEdit.vehicleCategory || "");
            setFuelType(vehicleToEdit.fuelType || "");
            setRemake(vehicleToEdit. remark  || "");
            setStaffMemberDetails(vehicleToEdit.staffMemberDetails || "");
            setStatus(vehicleToEdit.status || "");
        }
    }, [vehicleToEdit]); // Ensure dependency array is correct

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const vehicleModel = new VehicleModel(
                vehicleCode,
                licensePlateNumber,
                vehicleCategory,
                fuelType,
                status,
                staffMemberDetails,
                remark
            );

            // Dispatch the updateVehicle action
            dispatch(updateVehicle(vehicleModel));

            // Reset state
            resetForm();

            // Close modal after submission
            onClose();
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };

    const resetForm = () => {
        setVehicleCode("");
        setLicensePlateNumber("");
        setVehicleCategory("");
        setFuelType("");
        setStaffMemberDetails("");
        setRemake("");
        setStatus("");
    };

    const closeModal = () => {
        resetForm();
        onClose();
    };

    return (
        <div
            id="cropForm"
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <h1 className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-5xl font-bold">
                Update Vehicle
            </h1>
            <form
                className="flex flex-wrap gap-5 w-[75vw] h-[360px] rounded-[20px] shadow-lg bg-gray-300 p-6 relative"
                onSubmit={handleSubmit}
            >
                {/* Input fields from VehicleInputModel */}
                <VehicleInputModel
                    vehicleCode={vehicleCode}
                    setVehicleCode={setVehicleCode}
                    licensePlateNumber={licensePlateNumber}
                    setLicensePlateNumber={setLicensePlateNumber}
                    vehicleCategory={vehicleCategory}
                    setVehicleCategory={setVehicleCategory}
                    fuelType={fuelType}
                    setFuelType={setFuelType}
                    status={status}
                    setStatus={setStatus}
                    staffMemberDetails={staffMemberDetails}
                    setStaffMemberDetails={setStaffMemberDetails}
                    remake={remark}
                    setRemake={setRemake}
                />

                {/* Clear Button */}
                <button
                    type="button"
                    id="cleBtn"
                    className="absolute left-[53vw] top-[320px] w-[8vw] bg-transparent rounded-lg font-bold border border-black hover:bg-black hover:text-white"
                    onClick={resetForm}
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
};

export default UpdateVehicle;
