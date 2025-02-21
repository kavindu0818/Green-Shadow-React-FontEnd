import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {VehicleModel} from "../model/VehicleModel.ts";


const initialState:VehicleModel[]=[];

const api = axios.create({
    baseURL:'http://localhost:3000/veh'
})

export const saveVehicle = createAsyncThunk(
    "veh/saveVehicle",
    async (v: VehicleModel) => {
        try {
            const response = await api.post('/add', v)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const updateVehicle = createAsyncThunk(
    "veh/updateVehicle",
    async (v:VehicleModel) =>{
        try {
            const response = await api.put(`/update/${v.vehicleCode}`, v)
            return response.data
        }catch (err){
            console.log(err);
        }
    }
)

export const deleteVehicle = createAsyncThunk(
    "veh/deleteVehicle",
    async (vehCode: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${vehCode}`);
            if (response.status === 200) {
                return { message: "Deleted successfully.", vehCode };
            } else {
                return rejectWithValue("Failed to delete vehicle.");
            }
        } catch (err) {
            console.error("Error deleting vehicle:", err);
            return rejectWithValue(err || "Something went wrong.");
        }
    }
);

export const getAllVehicle = createAsyncThunk(
    "veh/getAllVehicle",
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

const VehicleSlice = createSlice({
    name: "veh",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder
            .addCase(saveVehicle.pending, () => {
                console.log("pending vehicle")
            })
            .addCase(saveVehicle.fulfilled, (state, action) => {
                console.log("fulfilled vehicle")
                state.push(action.payload);
            })
            .addCase(saveVehicle.rejected, () => {
                console.log("error vehicle")
            });

        builder
            .addCase(updateVehicle.pending, () => {
                console.log("pending update vehicle")
            })


    .addCase(updateVehicle.fulfilled, (state, action) => {
                console.log("fulfilled update vehicle")
                return state.map((veh) =>
                    veh.vehicleCode === action.payload.vehicleCode
                        ? {...veh, licensePlateNumber: action.payload.licensePlateNumber, vehicleCategory: action.payload.vehicleCategory,
                            fuelType: action.payload.fuelType, status: action.payload.status, staffMemberDetails: action.payload.staffMemberDetails, remake: action.payload.remake}
                        :veh
                );
            })
            .addCase(updateVehicle.rejected, () => {
                console.log("error update vehicle")
            });
        builder
            .addCase(deleteVehicle.pending, () => {
                console.log("pending delete vehicle")
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                console.log("fulfilled delete vehicle", action.payload.message); // Log the success message
                return state.filter((veh: VehicleModel) => veh.vehicleCode !== action.payload.vehCode);
            })

            .addCase(deleteVehicle.rejected, () => {
                console.log("error delete vehicle")
            });
        builder
            .addCase(getAllVehicle.fulfilled, (state, action) => {
                console.log("fetched vehicle");
                return action.payload;
            })
            .addCase(getAllVehicle.rejected, () => {
                console.error("Error fetching vehicle");
            });
        builder
    }
})

export default VehicleSlice.reducer
