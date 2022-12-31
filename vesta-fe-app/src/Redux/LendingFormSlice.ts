import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { LendingEntry, LendingFormState } from "../Types/LendingTypes";
import { LendingService } from "../Providers/LendingService";

const lendingAdapter = createEntityAdapter();

/**
 * App's Initial State
 */
export const initialState: LendingFormState = lendingAdapter.getInitialState({
  status: "Idle",
  Loan: {},
  Borrower: {},
});

/**
 * Thunk method to fetch Lending Form input and dispatch it to the App's State
 * @returns {LendingForm}
 */
export const fetchLendingForm = createAsyncThunk(
  "lending/fetchForm",
  async () => {
    const { fetchLendingForm } = LendingService();

    const response = await fetchLendingForm();
    return response;
  }
);

/**
 * Thunk method to fetch Lending Form and dispatch it to the App's State
 * @param {LendingEntry} lendingEntry Modified Lending entry
 * @returns {LendingForm}
 */
export const saveLendingForm = createAsyncThunk(
  "lending/saveForm",
  async (lendingEntry: LendingEntry) => {
    const { saveLendingForm } = LendingService();

    await saveLendingForm(lendingEntry);
    return lendingEntry;
  }
);

const lendingSlice = createSlice({
  name: "lending",
  initialState,
  reducers: {
    default(state, action) {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLendingForm.pending, (state, action) => {
        state.status = "Processing";
      })
      .addCase(fetchLendingForm.fulfilled, (state, action) => {
        state.status = "Idle";

        action.payload.forEach((lendingEntry: LendingEntry) => {
          if (lendingEntry.entity === "Loan") {
            state.Loan[lendingEntry.field] = lendingEntry;
          } else {
            state.Borrower[lendingEntry.field] = lendingEntry;
          }
        });
      })
      .addCase(fetchLendingForm.rejected, (state, action) => {
        state.status = "Error";
      })
      .addCase(saveLendingForm.pending, (state, action) => {
        state.status = "Processing";
      })
      .addCase(saveLendingForm.fulfilled, (state, action) => {
        state.status = "Idle";
        if (action.payload.entity === "Loan") {
          state.Loan[action.payload.field] = action.payload;
        } else {
          state.Borrower[action.payload.field] = action.payload;
        }
      })
      .addCase(saveLendingForm.rejected, (state, action) => {
        state.status = "Error";
      });
  },
});

/**
 * Selector that return all form entries from App's State
 * @param state State's App
 * @returns {Borrower} Borrower Input data
 */
export const selectForm = (state: { form: LendingFormState }) => state.form;

/**
 * Selector that return all borrower entries from App's State
 * @param state State's App
 * @returns {Borrower} Borrower Input data
 */
export const selectFormBorrowers = (state: { form: LendingFormState }) =>
  state.form.Borrower;

/**
 * Selector that return all Loan entries from App's State
 * @param state State's App
 * @returns {Loan} Loan Input data
 */
export const selectFormLoans = (state: { form: LendingFormState }) =>
  state.form.Loan;

/**
 * Selector that return App's State status
 * @param state State's App
 * @returns {LoadingStatus}
 */
export const selectFormStatus = (state: { form: LendingFormState }) =>
  state.form.status;

export const selectBorrowerEntries = createSelector(
  selectFormBorrowers,
  (borrowers) => Object.values(borrowers)
);

export const selectLoanEntries = createSelector(selectFormLoans, (loans) =>
  Object.values(loans)
);

export default lendingSlice.reducer;
