import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {StaffModel} from "../model/StaffModel.ts";
const initialState:StaffModel[]=[];

const api = axios.create({
    baseURL:'http://localhost:3000/staff'
})

export const saveStaff = createAsyncThunk(
    "staff/saveStaff",
    async (s: StaffModel) => {
        try {
            const response = await api.post('/add', s)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const updateStaff = createAsyncThunk(
    "staff/updateStaff",
    async (s:StaffModel) =>{
        try {
            const response = await api.put(`/update/${s.staffCode}`, s)
            return response.data
        }catch (err){
            console.log(err);
        }
    }
)

export const deleteStaff = createAsyncThunk(
    "staff/deleteStaff",
    async (staffCode: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${staffCode}`);
            if (response.status === 200) {
                return { message: "Deleted successfully.", staffCode };
            } else {
                return rejectWithValue("Failed to delete staff.");
            }
        } catch (err) {
            console.error("Error deleting staff:", err);
            return rejectWithValue(err || "Something went wrong.");
        }
    }
);

export const getAllStaffs = createAsyncThunk(
    "staff/getAllStaff",
    async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
)

const CropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder
            .addCase(saveStaff.pending, () => {
                console.log("pending staff")
            })
            .addCase(saveStaff.fulfilled, (state, action) => {
                console.log("fulfilled staff")
                state.push(action.payload);
            })
            .addCase(saveStaff.rejected, () => {
                console.log("error staff")
            });

        builder
            .addCase(updateStaff.pending, () => {
                console.log("pending update staff")
            })


            .addCase(updateStaff.fulfilled, (state, action) => {
                console.log("fulfilled update staff")
                return state.map((staff) =>
                    staff.staffCode === action.payload.staffCode
                        ? {...staff, firstName: action.payload.firstName, lastName: action.payload.lastName,
                            designation: action.payload.designation, gender: action.payload.gender, dob: action.payload.dob, address_one: action.payload.address_one, address_two: action.payload.address_two, address_three: action.payload.address_three,
                        contact: action.payload.contact, email: action.payload.email, role: action.payload.role, fieldCode: action.payload.fieldCode, join_date: action.payload.join_date}
                        : staff
                );
            })
            .addCase(updateStaff.rejected, () => {
                console.log("error update staff")
            });
        builder
            .addCase(deleteStaff.pending, () => {
                console.log("pending delete staff")
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                console.log("fulfilled delete staff", action.payload.message); // Log the success message
                return state.filter((staff: StaffModel) => staff.staffCode !== action.payload.staffCode);
            })

            .addCase(deleteStaff.rejected, () => {
                console.log("error delete staff")
            });
        builder
            .addCase(getAllStaffs.fulfilled, (state, action) => {
                console.log("fetched staffs");
                return action.payload;
            })

            .addCase(getAllStaffs.rejected, () => {
                console.error("Error fetching staffs");
            });
        builder
    }
})

export default CropSlice.reducer
