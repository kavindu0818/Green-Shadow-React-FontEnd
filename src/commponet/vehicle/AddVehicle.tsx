import React, { useState } from "react";
import { useDispatch} from "react-redux";
import {VehicleModel} from "../../model/VehicleModel.ts";
import {addVehicle} from "../../redux/VehicleSlice.ts";
import VehicleInputModel from "./VehicleInputModel.tsx";

export function AddVehicle({ onClose }: { onClose: () => void }) {

   const [vehicleCode, setVehicleCode] = useState("");
   const [licensePlateNumber , setLicensePlateNumber] = useState("");
   const [vehicleCategory, setVehicleCategory] = useState("");
   const [fuelType, setFuelType] = useState("");
   const [staffMemberDetails , setStaffMemberDetails] = useState("");
   const [remake, setRemake] = useState("");
   const [status, setStatus] = useState("");


    const dispatch = useDispatch();

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
                remake
            );

            // Dispatch the addVehicle action
            dispatch(addVehicle(vehicleModel));

            // Reset state
            setVehicleCode("");
            setLicensePlateNumber("");
            setVehicleCategory("");
            setFuelType("");
            setStaffMemberDetails("");
            setRemake("");
            setStatus("")

            // Close modal after submission
            onClose();
        } catch (error) {
            console.error("Error creating VehicleModel:", error);
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
                ADD VEHICLE
            </h1>
            <form
                className="flex flex-wrap gap-5 w-[75vw] h-[360px] rounded-[20px] shadow-lg bg-gray-300 p-6 relative"
                onSubmit={handleSubmit}
            >
                {/* "ADD CROP" Title */}


                {/* Input fields from CropInputModel */}
                <VehicleInputModel
                    vehicleCode={vehicleCode}
                    setVehicleCode={setVehicleCode}
                    licensePlateNumber={licensePlateNumber}
                    setLicensePlateNumber={setLicensePlateNumber}
                    vehicleCategory={vehicleCategory}
                    setVehicleCategory={setVehicleCategory}
                    fuelType={fuelType}
                    setFuelType={setFuelType}
                    status = {status}
                    setStatus = {setStatus}
                    staffMemberDetails={staffMemberDetails}
                    setStaffMemberDetails={setStaffMemberDetails}
                    remake={remake}
                    setRemake={setRemake}
                />

                {/* Clear Button */}
                <button
                    type="button"
                    id="cleBtn"
                    className="absolute left-[53vw] top-[320px] w-[8vw] bg-transparent rounded-lg font-bold border border-black hover:bg-black hover:text-white"
                    onClick={() => {
                        setVehicleCode("");
                        setLicensePlateNumber("");
                        setVehicleCategory("");
                        setFuelType("");
                        setStaffMemberDetails("");
                        setRemake("");
                        setStatus("")
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

export default AddVehicle;
