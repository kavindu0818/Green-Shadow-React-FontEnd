import { useState } from "react";

export function FieldInputModel(props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String); // Set image preview locally
                props.setFieldImage(base64String); // Pass image data to parent state
            };
        }
    };

    return (
        <>
            <section>
                <label htmlFor="inpF1" className="font-bold w-full left-5 top-1 absolute">
                    Code
                </label>
                <input
                    id="inpF1"
                    type="text"
                    placeholder="Enter Field code"
                    className="absolute w-[33vw] top-7 left-4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.fieldCode}
                    onChange={(e) => props.setFieldCode(e.target.value)}
                    required
                />

                <label htmlFor="inpF2" className="font-bold w-full absolute top-1 left-2/4">
                    Field Name
                </label>
                <input
                    id="inpF2"
                    type="text"
                    placeholder="Enter field name"
                    className="absolute left-2/4 top-7 w-[33vw] shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.fieldName}
                    onChange={(e) => props.setFieldName(e.target.value)}
                    required
                />

                <label htmlFor="inpF3" className="font-bold w-full absolute left-5 top-20">
                    Field Location
                </label>
                <input
                    id="inpF3"
                    type="text"
                    placeholder="Enter Field Location"
                    className="absolute w-[33vw] top-28 left-4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.fieldLocation}
                    onChange={(e) => props.setFieldLocation(e.target.value)}
                />

                <label htmlFor="inpF5" className="font-bold w-full absolute top-20 left-2/4">
                    Extent size of the Field
                </label>
                <input
                    id="inpF5"
                    type="text"
                    placeholder="Enter Extent size of the Field"
                    className="absolute w-[33vw] shadow-lg rounded-lg p-2 border top-28 left-2/4 border-gray-400"
                    value={props.fieldSize}
                    onChange={(e) => props.setFieldSize(e.target.value)}
                />

                <label htmlFor="inpF6" className="font-bold w-full absolute top-40 left-5">
                    Upload Field Image
                </label>
                <input
                    id="inpF4"
                    type="file"
                    accept="image/*"
                    className="absolute w-[33vw] top-48 left-5 shadow-lg rounded-lg p-2 border border-gray-400"
                    onChange={handleImageChange} // Handle file change
                />

                {/* Display image preview */}
                {imagePreview && (
                    <div className="mt-4">
                        <img
                            src={imagePreview}
                            alt="Field Image Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                    </div>
                )}

                <br />
                <button onClick={props.handleSubmit} className="btn btn-primary">
                    {props.children}
                </button>
            </section>
        </>
    );
}
