export function VehicleInputModel(props){
    return(
        <>
            <section>
                <label htmlFor="inpF1" className="font-bold w-full left-5 absolute top-1">
                    Code
                </label>
                <input
                    id="inpF1"
                    type="text"
                    placeholder="Enter Vehicle code"
                    className="absolute w-[33vw] top-7 left-4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.vehicleCode}
                    onChange={(e) => props.setVehicleCode(e.target.value)}
                    required
                />

                <label htmlFor="inpF2" className="font-bold w-full absolute left-2/4 top-1">
                    License Plate Number
                </label>
                <input
                    id="inpF2"
                    type="text"
                    placeholder="Enter License Plate Number"
                    className="absolute left-2/4 top-7 w-[33vw] shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.licensePlateNumber}
                    onChange={(e) => props.setLicensePlateNumber(e.target.value)}
                    required
                />

                <label htmlFor="inpF3" className="font-bold w-full absolute left-5 top-20">
                    Vehicle Category
                </label>
                <input
                    id="inpF3"
                    type="text"
                    placeholder="Enter Vehicle Category"
                    className="absolute w-[33vw] top-28 left-4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.vehicleCategory}
                    onChange={(e) => props.setVehicleCategory(e.target.value)}
                />

                <label htmlFor="inpF5" className="font-bold w-full absolute top-20 left-2/4">
                    Fuel Type
                </label>
                <input
                    id="inpF5"
                    type="text"
                    placeholder="Enter Fuel Type"
                    className="absolute w-[33vw] shadow-lg rounded-lg p-2 border top-28 left-2/4 border-gray-400"
                    value={props.fuelType}
                    onChange={(e) => props.setFuelType(e.target.value)}
                />

                <label htmlFor="inpF5" className="font-bold w-full absolute top-40 left-5">
                    Staff Member Details
                </label>
                <input
                    id="inpF5"
                    type="text"
                    placeholder="Enter Member Details"
                    className="absolute w-[33vw] top-48 left-5 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props. staffMemberDetails}
                    onChange={(e) => props.setStaffMemberDetails(e.target.value)}
                />

                <label htmlFor="inpF5" className="font-bold w-full absolute left-2/4 top-40">
                    Status
                </label>
                <input
                    id="inpF5"
                    type="text"
                    placeholder="Enter Status"
                    className="absolute w-[33vw] top-48 left-2/4 shadow-lg rounded-lg p-2 border border-gray-400"
                    value={props.status}
                    onChange={(e) => props.setStatus(e.target.value)}
                />

                <label htmlFor="inpF4" className="font-bold w-full absolute top-60 left-5">
                    Remake
                </label>
                <input
                    id="inpF4"
                    type="text"
                    placeholder="Enter Remake"
                    className="absolute w-[33vw] top-3/4 shadow-lg rounded-lg p-2 border border-gray-400 left-5"
                    value={props.remark}
                    onChange={(e) => props.setRemake(e.target.value)}
                />
                <br/>
                <button onClick={props.handleSubmit} className="btn btn-primary">
                    {props.children}
                </button>
            </section>
        </>
    )
}

export default VehicleInputModel;