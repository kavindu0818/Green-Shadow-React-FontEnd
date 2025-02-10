import {useState} from "react";
import {useDispatch} from "react-redux";
import {FieldModel} from "../../model/FieldModel.ts";
import {saveField} from "../../redux/FieldSlice.ts";
import {FieldInputModel} from "../../commponet/field/FieldInputModel.tsx";
import {AppDispatch} from "../../store/store.tsx";

export function AddField({ onClose }: { onClose: () => void }){

    const [fieldCode, setFieldCode] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldLocation, setFieldLocation] = useState('');
    const [fieldSize, setFieldSize] = useState('');
    const [fieldImage, setFieldImage] = useState<File | null>(null);

    const dispatch = useDispatch<AppDispatch>();


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

            dispatch(saveField(fieldModel));

            setFieldCode("");
            setFieldName("");
            setFieldLocation("");
            setFieldSize("");
            setFieldImage(null);

            onClose(); // Fixed name
        } catch (error) {
            console.log("Error adding field", error);
        }
    };

    const closeModal = () => {
        onClose(); // Fixed name
    };


    return (
        <div id="fieldForm" className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center  justify-center">
            <h1 className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-5xl font-bold">ADD FIELD</h1>

            <form className="flex flex-wrap gap-5 w-[75vw] h-[360px] rounded-[20px] shadow-lg bg-gray-300 p-6 relative"
            onSubmit={handleSubmit}>

                <FieldInputModel
                    setFieldCode={setFieldCode}
                    setFieldName={setFieldName}
                    setFieldLocation={setFieldLocation}
                    setFieldSize={setFieldSize}
                    setFieldImage={setFieldImage}
                />

                <button
                    type="button"
                    id="cleBtn"
                    className="absolute left-[53vw] top-[320px] w-[8vw] bg-transparent rounded-lg font-bold border border-black hover:bg-black hover:text-white"
                    onClick={() =>{
                        setFieldCode("");
                        setFieldName("");
                        setFieldLocation("");
                        setFieldSize("");
                        setFieldImage(null);
                    }}
                >
                 Clear
                </button>

                <button  type="submit"
                         id="subBtn"
                         className="absolute left-[62vw] top-[320px] w-[8vw] bg-black text-white rounded-lg font-bold hover:bg-transparent hover:text-black border border-black"
                >
                    Submit
                </button>

                <span
                    className="absolute top-4 right-6 text-2xl cursor-pointer"
                    onClick={closeModal}
                >
                    &times;
                </span>
            </form>
        </div>
    )
}

export default AddField;