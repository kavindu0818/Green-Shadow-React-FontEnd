export function EquipmentInputModel(props) {
    return (
        <>
            <section>
                <label htmlFor="inpF1" className="font-bold w-full left-5 absolute top-1">
                   Equipment Code
                </label>
                <input
                    id="inpF1"
                    type="text"
                    placeholder="Enter Equipment code"
                    className="absolute w-[33vw] top-7 left-4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.equipCode}
                    onChange={(e) => props.setEquipCode(e.target.value)}
                    required
                />

                <label htmlFor="inpF2" className="font-bold w-full absolute left-2/4 top-1">
                    Equipment Name
                </label>
                <input
                    id="inpF2"
                    type="text"
                    placeholder="Enter Equipment name"
                    className="absolute left-2/4 top-7 w-[33vw] shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.equipName}
                    onChange={(e) => props.setEquipName(e.target.value)}
                    required
                />

                <label htmlFor="inpF3" className="font-bold w-full absolute left-5 top-20">
                    Equipment Type
                </label>
                <input
                    id="inpF3"
                    type="text"
                    placeholder="Enter Equipment Type"
                    className="absolute w-[33vw] top-28 left-4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.equipType}
                    onChange={(e) => props.setEquipType(e.target.value)}
                />

                <label htmlFor="inpF5" className="font-bold w-full absolute top-20 left-2/4">
                   Equipment Status
                </label>
                <input
                    id="inpF5"
                    type="text"
                    placeholder="Enter Equipment Status"
                    className="absolute w-[33vw] shadow-lg rounded-lg p-2 border top-28 left-2/4 border-gray-400"
                    value={props.equipStatus}
                    onChange={(e) => props.setEquipStatus(e.target.value)}
                />

                <label htmlFor="inpF6" className="font-bold w-full absolute top-40 left-5">
                    Staff
                </label>
                <input
                    id="inpF6"
                    type="text"
                    placeholder="Enter Staff Code"
                    className="absolute w-[33vw] top-48 left-5 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.staffCode}
                    onChange={(e) => props.setStaffCode(e.target.value)}
                />

                <label htmlFor="inpF7" className="font-bold w-full absolute left-2/4 top-40">
                    Field
                </label>
                <select
                    id="inpF7"
                    className="absolute w-[33vw] top-48 left-2/4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.fieldCode}
                    onChange={(e) => props.setFieldCode(e.target.value)}
                >
                    <option value="">Select Field</option>
                    <option value="field1">Field 1</option>
                    <option value="field2">Field 2</option>
                    <option value="field3">Field 3</option>
                </select>
                <br/>
                <button onClick={props.handleSubmit} className="btn btn-primary">
                    {props.children}
                </button>
            </section>
        </>
    );
}

export default EquipmentInputModel;
