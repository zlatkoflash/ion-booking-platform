interface IControlSlice {
  mobileMenuIsOpened: boolean;
  modalFiltersShow: boolean;
  tourMobileSectionActive: string;
  showModalForEarlyPayment: {
    show: boolean;
    booking: IDBBookingDetails | null
  };
  globalToaster: {
    show: boolean;
    message: string;
    title: string;
    type: "info" | "success" | "warning" | "danger";
  }
}

const initialState: IControlSlice = {
  mobileMenuIsOpened: false,
  modalFiltersShow: false,
  tourMobileSectionActive: "",
  showModalForEarlyPayment: {
    show: false,
    booking: null
  },
  globalToaster: {
    show: false,
    message: "",
    title: "",
    type: "info"
  }
}

import { IDBBookingDetails } from "@/utils/interface-database";
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
    },
    setShowModalForEarlyPayment(state, action: PayloadAction<{ show: boolean, booking: IDBBookingDetails | null }>) {
      state.showModalForEarlyPayment = action.payload;
    },
    setGlobalToaster(state, action: PayloadAction<{ show: boolean, message: string, title: string, type: "info" | "success" | "warning" | "danger" }>) {
      state.globalToaster = action.payload;
    }
  },
});

export default controlsSlice.reducer;
export const { setMobileMenuIsOpened, setModalFiltersShow, setTourMobileSectionActive, setShowModalForEarlyPayment, setGlobalToaster } = controlsSlice.actions;