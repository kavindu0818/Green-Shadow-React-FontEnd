import { useState } from "react";

export function CropInputModel(props) {
    const [cropImage, setCropImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setCropImage(base64String); // Update local state
                props.setCropImage(base64String); // Update parent state
            };
        }
    };

    return (
        <>
            <section>
                <label htmlFor="inpF1" className="font-bold w-full left-5 absolute">
                    Code
                </label>
                <input
                    id="inpF1"
                    type="text"
                    placeholder="Enter crop code"
                    className="absolute w-[33vw] top-7 left-4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.cropCode}
                    onChange={(e) => props.setCropCode(e.target.value)}
                    required
                />

                <label htmlFor="inpF2" className="font-bold w-full absolute left-2/4">
                    Crop Name
                </label>
                <input
                    id="inpF2"
                    type="text"
                    placeholder="Enter crop name"
                    className="absolute left-2/4 top-7 w-[33vw] shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.cropName}
                    onChange={(e) => props.setCropName(e.target.value)}
                    required
                />

                <label htmlFor="inpF3" className="font-bold w-full absolute left-5 top-20">
                    Crop Scientific Name
                </label>
                <input
                    id="inpF3"
                    type="text"
                    placeholder="Enter crop scientific name"
                    className="absolute w-[33vw] top-28 left-4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.cropScientificName}
                    onChange={(e) => props.setCropScientificName(e.target.value)}
                />

                <label htmlFor="inpF5" className="font-bold w-full absolute top-20 left-2/4">
                    Category
                </label>
                <input
                    id="inpF5"
                    type="text"
                    placeholder="Enter Category"
                    className="absolute w-[33vw] shadow-lg rounded-lg p-2 border top-28 left-2/4 border-gray-400"
                    value={props.cropCategory}
                    onChange={(e) => props.setCropCategory(e.target.value)}
                />

                <label htmlFor="inpF6" className="font-bold w-full absolute top-40 left-5">
                    Crop Season
                </label>
                <input
                    id="inpF6"
                    type="text"
                    placeholder="Enter Crop season"
                    className="absolute w-[33vw] top-48 left-5 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.cropSeason}
                    onChange={(e) => props.setCropSeason(e.target.value)}
                />

                <label htmlFor="inpF7" className="font-bold w-full absolute left-2/4 top-40">
                    Field
                </label>
                <select
                    id="inpF7"
                    className="absolute w-[33vw] top-48 left-2/4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.fieldCode}
                    onChange={(e) => props.setCropField(e.target.value)}
                >
                    <option value="">Select Field</option>
                    <option value="F003">F003</option>
                    <option value="field2">Field 2</option>
                    <option value="field3">Field 3</option>
                </select>

                <label htmlFor="inpF4" className="font-bold w-full absolute top-60 left-5">
                    Upload Crop Image
                </label>
                <input
                    id="inpF4"
                    type="file"
                    accept="image/*"
                    className="absolute w-[33vw] top-3/4 shadow-lg rounded-lg p-2 border border-gray-400 left-5"
                    onChange={handleImageChange}
                />

                {/* Preview Image */}
                {cropImage && (
                    <img
                        src={cropImage}
                        alt="Crop Preview"
                        className="absolute top-[80%] left-5 w-[100px] h-[100px] object-cover rounded-lg border border-gray-400"
                    />
                )}

                <br />
                <button onClick={props.handleSubmit} className="btn btn-primary">
                    {props.children}
                </button>
            </section>
        </>
    );
}

export default CropInputModel;
