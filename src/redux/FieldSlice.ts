import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {FieldModel} from "../model/FieldModel.ts";


const initialState:FieldModel[]=[];

const api = axios.create({
    baseURL:'http://localhost:3000/field'
})

export const saveField = createAsyncThunk(
    "field/saveField",
    async (f: FieldModel) => {
        try {
            const response = await api.post('/add', f)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const updateField = createAsyncThunk(
    "field/updateField",
    async (f:FieldModel) =>{
        try {
            const response = await api.put(`/update/${f.fieldCode}`, f)
            return response.data
        }catch (err){
            console.log(err);
        }
    }
)

export const deleteField = createAsyncThunk(
    "field/deleteField",
    async (fieldCode: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${fieldCode}`);
            if (response.status === 200) {
                return { message: "Deleted successfully.", fieldCode };
            } else {
                return rejectWithValue("Failed to delete field.");
            }
        } catch (err) {
            console.error("Error deleting field:", err);
            return rejectWithValue(err || "Something went wrong.");
        }
    }
);

export const getAllFields = createAsyncThunk(
    "field/getAllField",
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

const FieldSlice = createSlice({
    name: "field",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder
            .addCase(saveField.pending, () => {
                console.log("pending field")
            })
            .addCase(saveField.fulfilled, (state, action) => {
                console.log("fulfilled field")
                state.push(action.payload);
            })
            .addCase(saveField.rejected, () => {
                console.log("error field")
            });
        builder
            .addCase(updateField.pending, () => {
                console.log("pending update field")
            })
            .addCase(updateField.fulfilled, (state, action) => {
                console.log("fulfilled update field")
                return state.map((field) =>
                    field.fieldCode === action.payload.fieldCode
                        ? {...field, fieldName: action.payload.fieldName, fieldLocation: action.payload.fieldLocation,
                            fieldSize: action.payload.fieldSize, fieldImage: action.payload.fieldImage}
                        : field
                );
            })
            .addCase(updateField.rejected, () => {
                console.log("error update Field")
            });
        builder
            .addCase(deleteField.pending, () => {
                console.log("pending delete Field")
            })
            .addCase(deleteField.fulfilled, (state, action) => {
                console.log("fulfilled delete crop", action.payload.message); // Log the success message
                return state.filter((field: FieldModel) => field.fieldCode !== action.payload.fieldCode);
            })

            .addCase(deleteField.rejected, () => {
                console.log("error delete field")
            });
        builder
            .addCase(getAllFields.fulfilled, (state, action) => {
                console.log("fetched crops");
                return action.payload;
            })
            .addCase(getAllFields.rejected, () => {
                console.error("Error fetching fields");
            });
        builder
    }
})

export default FieldSlice.reducer
