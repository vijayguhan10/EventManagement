import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: {},
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventData: (state, action) => {
      state.event = { ...state.event, ...action.payload };
    },
    resetEventState: () => initialState,
  },
});

export const { setEventData,resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
