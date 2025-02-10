import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FieldModel } from "../../model/FieldModel";
import { updateField } from "../../redux/FieldSlice";
import { FieldInputModel } from "./FieldInputModel";
import {AppDispatch} from "../../store/store.tsx";

interface UpdateFieldProps {
    fieldToEdit: FieldModel;
    onClose: () => void;
}

const UpdateField: React.FC<UpdateFieldProps> = ({ fieldToEdit, onClose }) => {
    const [fieldCode, setFieldCode] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [fieldLocation, setFieldLocation] = useState("");
    const [fieldSize, setFieldSize] = useState("");
    const [fieldImage, setFieldImage] = useState<File | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (fieldToEdit) {
            setFieldCode(fieldToEdit.fieldCode || "");
            setFieldName(fieldToEdit.fieldName || "");
            setFieldLocation(fieldToEdit.fieldLocation || "");
            setFieldSize(fieldToEdit.fieldSize || "");

            // Handle fieldImage appropriately
            if (typeof fieldToEdit.fieldImage === "string") {
                // If the fieldImage is a URL, you may want to convert it to a File later when needed.
                setFieldImage(null);
            } else if (fieldToEdit.fieldImage instanceof File) {
                setFieldImage(fieldToEdit.fieldImage);
            }
        }
    }, [fieldToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const fieldModel = new FieldModel(
                fieldCode,
                fieldName,
                fieldLocation,
                fieldSize,
                fieldImage
            );

            dispatch(updateField(fieldModel));

            // Reset the form
            setFieldCode("");
            setFieldName("");
            setFieldLocation("");
            setFieldSize("");
            setFieldImage(null);

            // Close the modal
            onClose();
        } catch (error) {
            console.error("Error updating field", error);
        }
    };

    const clearForm = () => {
        setFieldCode("");
        setFieldName("");
        setFieldLocation("");
        setFieldSize("");
        setFieldImage(null);
    };

    return (
        <div
            id="fieldForm"
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <h1 className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-5xl font-bold">
                UPDATE FIELD
            </h1>

            <form
                className="flex flex-wrap gap-5 w-[75vw] h-[360px] rounded-[20px] shadow-lg bg-gray-300 p-6 relative"
                onSubmit={handleSubmit}
            >
                <FieldInputModel
                    fieldCode={fieldCode}
                    fieldName={fieldName}
                    fieldLocation={fieldLocation}
                    fieldSize={fieldSize}
                    fieldImage={fieldImage}
                    setFieldCode={setFieldCode}
                    setFieldName={setFieldName}
                    setFieldLocation={setFieldLocation}
                    setFieldSize={setFieldSize}
                    setFieldImage={setFieldImage}
                />

                {/* Clear Button */}
                <button
                    type="button"
                    id="cleBtn"
                    className="absolute left-[53vw] top-[320px] w-[8vw] bg-transparent rounded-lg font-bold border border-black hover:bg-black hover:text-white"
                    onClick={clearForm}
                >
                    Clear
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    id="subBtn"
                    className="absolute left-[62vw] top-[320px] w-[8vw] bg-black text-white rounded-lg font-bold hover:bg-transparent hover:text-black border border-black"
                >
                    Update
                </button>

                {/* Close Button */}
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

export default UpdateField;
