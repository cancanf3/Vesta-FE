import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { EntityInput, LendingInformationState } from "../Types/LendingTypes";
import { LendingService } from "../Providers/LendingService";

const lendingAdapter = createEntityAdapter();

/**
 * App's Initial State
 */
export const initialState: LendingInformationState =
  lendingAdapter.getInitialState({
    status: "Idle",
    Loan: {},
    Borrower: {},
  });

/**
 * Thunk method to fetch Lending Information input and dispatch it to the App's State
 * @returns {LendingForm}
 */
export const fetchLendingInformation = createAsyncThunk(
  "lending/fetchInformation",
  async () => {
    const { fetchLendingInformation } = LendingService();

    const response = await fetchLendingInformation();

    console.log(response);
    return response;
  }
);

/**
 * Thunk method to fetch Lending information and dispatch it to the App's State
 * @param {LendingEntry} lendingEntry Modified Lending entry
 * @returns {LendingForm}
 */
export const saveLendingInformation = createAsyncThunk(
  "lending/saveInformation",
  async (entityInput: EntityInput) => {
    const { saveLendingInformation } = LendingService();

    await saveLendingInformation(entityInput);
    return entityInput;
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
      .addCase(fetchLendingInformation.pending, (state, action) => {
        state.status = "Processing";
      })
      .addCase(fetchLendingInformation.fulfilled, (state, action) => {
        state.status = "Idle";
        state.Loan = action.payload.Loan;
        state.Borrower = action.payload.Borrower;
      })
      .addCase(fetchLendingInformation.rejected, (state, action) => {
        state.status = "Error";
      })
      .addCase(saveLendingInformation.pending, (state, action) => {
        state.status = "Processing";
      })
      .addCase(saveLendingInformation.fulfilled, (state, action) => {
        if (action.payload.entityType === "Loan") {
          state.Loan[action.payload.inputField] = action.payload.lendingInput;
        } else if (action.payload.entityType === "Borrower") {
          state.Loan[action.payload.inputField] = action.payload.lendingInput;
        }
      })
      .addCase(saveLendingInformation.rejected, (state, action) => {
        state.status = "Error";
      });
  },
});

/**
 * Selector that return all borrower entries from App's State
 * @param state State's App
 * @returns {Borrower} Borrower Input data
 */
export const selectInformationBorrowers = (state: {
  information: LendingInformationState;
}) => state.information.Borrower;

/**
 * Selector that return all Loan entries from App's State
 * @param state State's App
 * @returns {Loan} Loan Input data
 */
export const selectInformationLoans = (state: {
  information: LendingInformationState;
}) => state.information.Loan;

/**
 * Selector that return App's State status
 * @param state State's App
 * @returns {LoadingStatus}
 */
export const selectInformationStatus = (state: {
  information: LendingInformationState;
}) => state.information.status;

export const selectBorrowerEntries = createSelector(
  selectInformationBorrowers,
  (borrowers) => Object.values(borrowers)
);

export const selectLoanEntries = createSelector(
  selectInformationLoans,
  (loans) => Object.values(loans)
);

export default lendingSlice.reducer;
