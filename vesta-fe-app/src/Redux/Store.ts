import { configureStore } from "@reduxjs/toolkit";
import lendingFormReducer from "./LendingFormSlice";
import lendingInformationReducer from "./LendingInformationSlice";

const store = configureStore({
  reducer: {
    form: lendingFormReducer,
    information: lendingInformationReducer,
  },
  devTools: true,
});

export default store;
