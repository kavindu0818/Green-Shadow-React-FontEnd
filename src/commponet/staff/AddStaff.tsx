import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {StaffModel} from "../../model/StaffModel.ts";
import { saveStaff} from "../../redux/StaffSlice.ts";
import {StaffInputModel} from "./StaffInputModel.tsx";
import {AppDispatch} from "../../store/store.tsx";


export function AddStaff({ onClose }: { onClose: () => void }){
    const [staffCode, setStaffCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState(""); // Adjusted type for DOB
    const [address_one, setAddressOne] = useState("");
    const [address_two, setAddressTwo] = useState("");
    const [address_three, setAddressThree] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [fieldCode, setFieldCode] = useState("");
    const [join_date,setJoinDate] = useState("")

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Create a new CropModel instance
            const staffModel = new StaffModel(
                staffCode,
            firstName,
            lastName,
            designation,
            gender,
            dob,
            address_one,
            address_two,
            address_three,
            contact,
            email,
            role,
            fieldCode,
            join_date
            );

            console.log("Staffe eka print wena"+staffModel.staffCode,staffModel.firstName);
            // Dispatch the addCrop action
            dispatch(saveStaff(staffModel));

            // Reset state
            setStaffCode("");
            setFirstName("");
            setLastName("");
            setDesignation("");
            setGender("");
            // setDob(null);
            setAddressOne("");
            setAddressTwo("");
            setAddressThree("");
            setContact("");
            setEmail("");
            setRole("");
            setFieldCode("");

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
            <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white text-5xl font-bold">
                ADD STAFF
            </h1>
            <form
                className="flex flex-wrap gap-5 w-[75vw] h-[460px] rounded-[20px] shadow-lg bg-gray-300 p-6 relative"
                onSubmit={handleSubmit}
            >
                {/* "ADD CROP" Title */}


                {/* Input fields from CropInputModel */}
                <StaffInputModel
                    staffCode={staffCode}
                    setStaffCode={setStaffCode}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    designation={designation}
                    setDesignation={setDesignation}
                    gender={gender}
                    setGender={setGender}
                    dob={dob}
                    setDob={setDob}
                    address_one={address_one}
                    setAddressOne={setAddressOne}
                    address_two={address_two}
                    setAddressTwo={setAddressTwo}
                    address_three={address_three}
                    setAddressThree={setAddressThree}
                    contact={contact}
                    setContact={setContact}
                    email={email}
                    setEmail={setEmail}
                    role={role}
                    setRole={setRole}
                    fieldCode={fieldCode}
                    setFieldCode={setFieldCode}
                    join_date={join_date}
                    setJoinDate={setJoinDate}
                />


                {/* Clear Button */}
                <button
                    type="button"
                    id="cleBtn"
                    className="absolute left-[53vw] top-[420px] w-[8vw] bg-transparent rounded-lg font-bold border border-black hover:bg-black hover:text-white"
                    onClick={() => {
                        setStaffCode("");
                        setFirstName("");
                        setLastName("");
                        setDesignation("");
                        setGender("");
                        // setDob(null);
                        setAddressOne("");
                        setAddressTwo("");
                        setAddressThree("");
                        setContact("");
                        setEmail("");
                        setRole("");
                        setFieldCode("");
                    }}
                >
                    Clear
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    id="subBtn"
                    className="absolute left-[62vw] top-[420px] w-[8vw] bg-black text-white rounded-lg font-bold hover:bg-transparent hover:text-black border border-black"
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

export default AddStaff;