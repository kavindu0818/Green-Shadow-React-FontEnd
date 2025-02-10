import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CropModel} from "../model/CropModel";
import axios from "axios";


const initialState:CropModel[]=[];

const api = axios.create({
    baseURL:'http://localhost:3000/crop'
})

export const saveCrop = createAsyncThunk(
    "crop/saveCrop",
    async (c: CropModel) => {
        try {
            const response = await api.post('/add', c)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const updateCrop = createAsyncThunk(
    "crop/updateCrop",
    async (c:CropModel) =>{
        try {
            const response = await api.put(`/update/${c.cropCode}`, c)
            return response.data
        }catch (err){
            console.log(err);
        }
    }
)

export const deleteCrop = createAsyncThunk(
    "crop/deleteCrop",
    async (cropCode: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${cropCode}`);
            if (response.status === 200) {
                return { message: "Deleted successfully.", cropCode };
            } else {
                return rejectWithValue("Failed to delete crop.");
            }
        } catch (err) {
            console.error("Error deleting crop:", err);
            return rejectWithValue(err || "Something went wrong.");
        }
    }
);

export const getAllCrops = createAsyncThunk(
    "crop/getAllCrop",
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
            .addCase(saveCrop.pending, () => {
                console.log("pending crop")
            })
            .addCase(saveCrop.fulfilled, (state, action) => {
                console.log("fulfilled crop")
                state.push(action.payload);
            })
            .addCase(saveCrop.rejected, () => {
                console.log("error crop")
            });

        builder
            .addCase(updateCrop.pending, () => {
                console.log("pending update crop")
            })
            .addCase(updateCrop.fulfilled, (state, action) => {
                console.log("fulfilled update crop")
                return state.map((crop) =>
                    crop.cropCode === action.payload.cropCode
                        ? {...crop, cropCommonName: action.payload.cropCommonName, cropScientificName: action.payload.cropScientificName,
                        cropCategory: action.payload.cropCategory, cropSeason: action.payload.cropSeason, cropImage: action.payload.cropImage, fieldCode: action.payload.fieldCode}
                        : crop
                );
            })
            .addCase(updateCrop.rejected, () => {
                console.log("error update crop")
            });
        builder
            .addCase(deleteCrop.pending, () => {
                console.log("pending delete crop")
            })
            .addCase(deleteCrop.fulfilled, (state, action) => {
                console.log("fulfilled delete crop", action.payload.message); // Log the success message
                return state.filter((crop: CropModel) => crop.cropCode !== action.payload.cropCode);
            })

            .addCase(deleteCrop.rejected, () => {
                console.log("error delete customer")
            });
        builder
            .addCase(getAllCrops.fulfilled, (state, action) => {
                console.log("fetched crops");
                return action.payload;
            })
            .addCase(getAllCrops.rejected, () => {
                console.error("Error fetching crops");
            });
        builder
    }
})

export default CropSlice.reducer
