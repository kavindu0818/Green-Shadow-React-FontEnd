import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserModel } from "../model/UserModel.ts";

const initialState = {
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: '',
    users: [] as UserModel[], // Added users array to store fetched users
};

const api = axios.create({
    baseURL: 'http://localhost:3000/user',
});

export const saveUser = createAsyncThunk(
    "user/saveUser",
    async (user: UserModel, { rejectWithValue }) => {
        try {
            console.log("Slice", user);
            const response = await api.post('/add', user, { withCredentials: true });
            return response.data;
        } catch (err: any) {
            console.error("Error in saveUser thunk:", err);
            return rejectWithValue(err.response?.data || "An error occurred");
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (credentials: { phoneNumber: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/login', { user: credentials }, { withCredentials: true });
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            console.log("Token received:", response.data.accessToken);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Login failed");
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (user: UserModel, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${user.phoneNumber}`, user);
            return response.data;
        } catch (err: any) {
            console.error("Error updating user:", err);
            return rejectWithValue(err.response?.data || "Update failed");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${phoneNumber}`);
            if (response.status === 200) {
                return { message: "Deleted successfully.", phoneNumber };
            } else {
                return rejectWithValue("Failed to delete user.");
            }
        } catch (err: any) {
            console.error("Error deleting user:", err);
            return rejectWithValue(err.response?.data || "Something went wrong.");
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/');
            console.log("Fetched users:", response.data);
            return response.data;
        } catch (err: any) {
            console.error("Error fetching users:", err);
            return rejectWithValue(err.response?.data || "Error fetching users");
        }
    }
);

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.pending, (state) => {
                console.log("Pending user save...");
                state.loading = true;
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                console.log("User saved successfully");
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(saveUser.rejected, (state, action) => {
                console.log("Error saving user");
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(loginUser.pending, (state) => {
                state.isAuthenticated = false;
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.username = action.payload.username;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = "";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.loading = false;
            });

        builder
            .addCase(updateUser.pending, (state) => {
                console.log("Pending user update...");
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log("User updated successfully");
                state.loading = false;
                state.users = state.users.map((user) =>
                    user.phoneNumber === action.payload.phoneNumber
                        ? { ...user, ...action.payload }
                        : user
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                console.log("Error updating user");
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(deleteUser.pending, (state) => {
                console.log("Pending user deletion...");
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log("User deleted successfully");
                state.loading = false;
                state.users = state.users.filter((user) => user.phoneNumber !== action.payload.phoneNumber);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                console.log("Error deleting user");
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(getAllUsers.pending, (state) => {
                console.log("Fetching users...");
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                console.log("Users fetched successfully");
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                console.error("Error fetching users");
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default UserSlice.reducer;
