import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IThemeState {
  theme: string;
  font: string;
}

const initialState: IThemeState = {
  theme: "",
  font: "",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeState: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setFontState: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
  },
});

export const { setThemeState, setFontState } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
