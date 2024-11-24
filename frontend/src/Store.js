import eventReducer from "./redux/reducers/eventReducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;
