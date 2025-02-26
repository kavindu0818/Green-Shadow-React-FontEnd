import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {UserModel} from "../model/UserModel.ts";


const initialState:UserModel[]=[];

const api = axios.create({
    baseURL:'http://localhost:3000/user'
})

export const saveUser = createAsyncThunk(
    "user/saveUser",
    async (u: UserModel) => {
        try {
            const response = await api.post('/add', u)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (u:UserModel) =>{
        try {
            const response = await api.put(`/update/${u.phone}`, u)
            return response.data
        }catch (err){
            console.log(err);
        }
    }
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (phone: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${phone}`);
            if (response.status === 200) {
                return { message: "Deleted successfully.", phone};
            } else {
                return rejectWithValue("Failed to delete user.");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            return rejectWithValue(err || "Something went wrong.");
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
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

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder
            .addCase(saveUser.pending, () => {
                console.log("pending user")
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                console.log("fulfilled user")
                state.push(action.payload);
            })
            .addCase(saveUser.rejected, () => {
                console.log("error user")
            });
        builder
            .addCase(updateUser.pending, () => {
                console.log("pending update user")
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log("fulfilled update user")
                return state.map((user) =>
                    user.username === action.payload.userName
                        ? {...user, userName: action.payload.userName, password: action.payload.password,
                            role: action.payload.role}
                        : user
                );
            })
            .addCase(updateUser.rejected, () => {
                console.log("error update user")
            });
        builder
            .addCase(deleteUser.pending, () => {
                console.log("pending delete user")
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log("fulfilled delete user", action.payload.message); // Log the success message
                return state.filter((user: UserModel) => user.phone !== action.payload.phone);
            })

            .addCase(deleteUser.rejected, () => {
                console.log("error delete user")
            });
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                console.log("fetched user");
                return action.payload;
            })
            .addCase(getAllUsers.rejected, () => {
                console.error("Error fetching user");
            });
        builder
    }
})

export default UserSlice.reducer
