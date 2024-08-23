import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
    items: [],
};

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        add: (state, action) => {
             
            state.items.push(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { add } = testSlice.actions;

export default testSlice.reducer;
