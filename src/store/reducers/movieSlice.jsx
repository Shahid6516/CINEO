import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info: null,
}


export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        loadmovie:
    },

});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = movieSlice.actions

export default movieSlice.reducer