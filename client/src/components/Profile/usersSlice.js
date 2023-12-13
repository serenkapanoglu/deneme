import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Austin Stauffer' },
    { id: '1', name: 'Darian Carter' },
    { id: '2', name: 'Darrel' }
]

const usersSlice = createSlice ({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer