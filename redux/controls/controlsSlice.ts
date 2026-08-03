interface IControlSlice {
  mobileMenuIsOpened: boolean;
  modalFiltersShow: boolean;
  tourMobileSectionActive: string;
}

const initialState: IControlSlice = {
  mobileMenuIsOpened: false,
  modalFiltersShow: false,
  tourMobileSectionActive: "",
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setMobileMenuIsOpened(state, action: PayloadAction<boolean>) {
      state.mobileMenuIsOpened = action.payload;
    },
    setModalFiltersShow(state, action: PayloadAction<boolean>) {
      state.modalFiltersShow = action.payload;
    },
    setTourMobileSectionActive(state, action: PayloadAction<string>) {
      state.tourMobileSectionActive = action.payload;
    }
  },
});

export default controlsSlice.reducer;
export const { setMobileMenuIsOpened, setModalFiltersShow, setTourMobileSectionActive } = controlsSlice.actions;