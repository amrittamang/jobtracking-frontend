import { createSlice } from '@reduxjs/toolkit';


const initialStateSidebar = {
    showSidebar: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar-slice',
    initialState: initialStateSidebar,
    reducers: {
        toggleSidebar(state, action) {
            state.showSidebar = !state.showSidebar;
        }
    }
});

export default sidebarSlice.reducer;

export const sidebarAction = sidebarSlice.actions;