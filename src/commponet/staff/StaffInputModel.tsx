export function  StaffInputModel(props) {
    return(
        <>
                <section className="grid grid-cols-4 gap-6 p-4">
                    {/* Staff ID */}
                    <div className="flex flex-col">
                        <label htmlFor="inpF1" className="font-bold mb-2">
                            Staff ID
                        </label>
                        <input
                            id="inpF1"
                            type="text"
                            placeholder="Enter staff ID"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.staffCode}
                            onChange={(e) => props.setStaffCode(e.target.value)}
                            required
                        />
                    </div>

                    {/* First Name */}
                    <div className="flex flex-col">
                        <label htmlFor="inpF2" className="font-bold mb-2">
                            First Name
                        </label>
                        <input
                            id="inpF2"
                            type="text"
                            placeholder="Enter first name"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.firstName}
                            onChange={(e) => props.setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label htmlFor="inpF3" className="font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            id="inpF3"
                            type="text"
                            placeholder="Enter last name"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.lastName}
                            onChange={(e) => props.setLastName(e.target.value)}
                        />
                    </div>

                    {/* Designation */}
                    <div className="flex flex-col">
                        <label htmlFor="inpF5" className="font-bold mb-2">
                            Designation
                        </label>
                        <input
                            id="inpF5"
                            type="text"
                            placeholder="Enter designation"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.designation}
                            onChange={(e) => props.setDesignation(e.target.value)}
                        />
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col">
                        <label htmlFor="inpF6" className="font-bold mb-2">
                            Gender
                        </label>
                        <input
                            id="inpF6"
                            type="text"
                            placeholder="Enter gender"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.gender}
                            onChange={(e) => props.setGender(e.target.value)}
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col">
                        <label htmlFor="inpF7" className="font-bold mb-2">
                            Date of Birth
                        </label>
                        <input
                            id="inpF7"
                            type="date"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.dob}
                            onChange={(e) => props.setDob(e.target.value)}
                        />
                    </div>

                    {/* Address Line 1 */}
                    <div className="flex flex-col">
                        <label htmlFor="address1" className="font-bold mb-2">
                            Address Line 1
                        </label>
                        <input
                            id="address1"
                            type="text"
                            placeholder="Enter address line 1"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.address_one}
                            onChange={(e) => props.setAddressOne(e.target.value)}
                        />
                    </div>

                    {/* Address Line 2 */}
                    <div className="flex flex-col">
                        <label htmlFor="address2" className="font-bold mb-2">
                            Address Line 2
                        </label>
                        <input
                            id="address2"
                            type="text"
                            placeholder="Enter address line 2"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.address_two}
                            onChange={(e) => props.setAddressTwo(e.target.value)}
                        />
                    </div>

                    {/* Address Line 3 */}
                    <div className="flex flex-col">
                        <label htmlFor="address3" className="font-bold mb-2">
                            Address Line 3
                        </label>
                        <input
                            id="address3"
                            type="text"
                            placeholder="Enter address line 3"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.address_three}
                            onChange={(e) => props.setAddressThree(e.target.value)}
                        />
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col">
                        <label htmlFor="contact" className="font-bold mb-2">
                            Contact
                        </label>
                        <input
                            id="contact"
                            type="text"
                            placeholder="Enter contact"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.contact}
                            onChange={(e) => props.setContact(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-bold mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.email}
                            onChange={(e) => props.setEmail(e.target.value)}
                        />
                    </div>

                    {/* Role */}
                    <div className="flex flex-col">
                        <label htmlFor="role" className="font-bold mb-2">
                            Role
                        </label>
                        <input
                            id="role"
                            type="text"
                            placeholder="Enter role"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.role}
                            onChange={(e) => props.setRole(e.target.value)}
                        />
                    </div>

                    {/* Field */}
                    <div className="flex flex-col">
                        <label htmlFor="field" className="font-bold mb-2">
                            Field
                        </label>
                        <input
                            id="field"
                            type="text"
                            placeholder="Enter field"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.fieldCode}
                            onChange={(e) => props.setFieldCode(e.target.value)}
                        />
                    </div>

                    {/* Join Date */}
                    <div className="flex flex-col">
                        <label htmlFor="joinDate" className="font-bold mb-2">
                            Join Date
                        </label>
                        <input
                            id="joinDate"
                            type="date"
                            className="shadow-lg rounded-lg p-2 border border-gray-400"
                            value={props.join_date}
                            onChange={(e) => props.setJoinDate(e.target.value)}
                        />
                    </div>
                </section>

        </>
    )
}