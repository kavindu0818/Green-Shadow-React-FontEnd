import { configureStore } from "@reduxjs/toolkit";
import FieldSlice from "../redux/FieldSlice";
import CropSlice from "../redux/CropSlice";
import EquipmentSlice from "../redux/EquipmentSlice.ts";
import StaffSlice from "../redux/StaffSlice.ts";
import VehicleSlice from "../redux/VehicleSlice.ts";

// Create the Redux store
export const store = configureStore({
    reducer: {
        field: FieldSlice,
        crop: CropSlice,
        equipment: EquipmentSlice,
        staff: StaffSlice,
        vehicle: VehicleSlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

