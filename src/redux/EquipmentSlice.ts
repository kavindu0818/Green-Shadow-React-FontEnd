import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import EquipmentModel from "../model/EquipmentModel.ts";


const initialState:EquipmentModel[]=[];

const api = axios.create({
    baseURL:'http://localhost:3000/equ'
})

export const saveEquipment = createAsyncThunk(
    "equ/saveEquipment",
    async (e: EquipmentModel) => {
        try {
            const response = await api.post('/add', e)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const updateEquipment = createAsyncThunk(
    "equ/updateEquipment",
    async (e:EquipmentModel) =>{
        try {
            const response = await api.put(`/update/${e.equipCode}`, e)
            return response.data
        }catch (err){
            console.log(err);
        }
    }
)

export const deleteEquipment = createAsyncThunk(
    "equ/deleteEquipment",
    async (equCode: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${equCode}`);
            if (response.status === 200) {
                return { message: "Deleted successfully.", equCode };
            } else {
                return rejectWithValue("Failed to delete equipment.");
            }
        } catch (err) {
            console.error("Error deleting equipment:", err);
            return rejectWithValue(err || "Something went wrong.");
        }
    }
);

export const getAllEquipment = createAsyncThunk(
    "equ/getAllEquipment",
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

const EquipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder
            .addCase(saveEquipment.pending, () => {
                console.log("pending equipment")
            })
            .addCase(saveEquipment.fulfilled, (state, action) => {
                console.log("fulfilled equipment")
                state.push(action.payload);
            })
            .addCase(saveEquipment.rejected, () => {
                console.log("error equipment")
            });
        builder
            .addCase(updateEquipment.pending, () => {
                console.log("pending update equipment")
            })
            .addCase(updateEquipment.fulfilled, (state, action) => {
                console.log("fulfilled update equipment")
                return state.map((equ) =>
                    equ.equipCode === action.payload.equipCode
                        ? {...equ, equipName: action.payload.equipName, equipType: action.payload.equipType,
                            equipStatus: action.payload.equipStatus}
                        : equ
                );
            })
            .addCase(updateEquipment.rejected, () => {
                console.log("error update equipment")
            });
        builder
            .addCase(deleteEquipment.pending, () => {
                console.log("pending delete equipment")
            })
            .addCase(deleteEquipment.fulfilled, (state, action) => {
                console.log("fulfilled delete equipment", action.payload.message); // Log the success message
                return state.filter((equ: EquipmentModel) => equ.equipCode !== action.payload.equCode);
            })

            .addCase(deleteEquipment.rejected, () => {
                console.log("error delete equipment")
            });
        builder
            .addCase(getAllEquipment.fulfilled, (state, action) => {
                console.log("fetched equipment");
                return action.payload;
            })
            .addCase(getAllEquipment.rejected, () => {
                console.error("Error fetching equipment");
            });
        builder
    }
})

export default EquipmentSlice.reducer
