import eventReducer from "./redux/reducers/eventReducers";
import { configureStore } from "@reduxjs/toolkit";
//adeded the changes
const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;
