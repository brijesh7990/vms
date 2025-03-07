import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    name: string;
    address: string;
}

const initialState: FormState = { name: "", address: "" };

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<FormState>) => {
            state.name = action.payload.name;
            state.address = action.payload.address;
        },
    },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;