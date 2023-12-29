import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    grid: "left",
  },
  reducers: {
    setGrid: (state, { payload }) => {
      state.grid = payload;
    },
  },
});

export const { setGrid } = themeSlice.actions;
export default themeSlice.reducer;
