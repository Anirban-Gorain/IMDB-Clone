import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
    url: {},
    genres: {},
}

export const homeSlice = createSlice(
    {
        name: "Home",
        initialState,
        reducers:
        {
            getAPIConfiguration: (state, action) =>
            {
                // console.log(action.payload);
                state.url = action.payload;
            },
            getGenres: (state, action) =>
            {
                state.genres = action.payload;
            },
        }
    });

export const {getAPIConfiguration, getGenres} = homeSlice.actions;
export default homeSlice.reducer;