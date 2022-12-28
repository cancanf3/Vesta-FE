import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState } from "@reduxjs/toolkit";
import { LendingEntry, LendingInformation, LendingStoreState } from "../Types/LendingTypes";
import { LendingService } from "../Providers/LendingService";


const lendingAdapter = createEntityAdapter();


/**
 * App's Initial State
 */
export const initialState: LendingStoreState = lendingAdapter.getInitialState({
    status: 'Idle',
    loan: {},
    borrower: {}
});

/**
 * Thunk method to fetch Lending information and dispatch it to the App's State
 * @returns {LendingInformation}
 */
export const fetchLendingInformation = createAsyncThunk('lending/fetchLendingInformation', async () => {

    const { fetchLendingInformation } = LendingService();

    const response = await fetchLendingInformation();

    console.log(response);
    return response
})


/**
 * Thunk method to fetch Lending information and dispatch it to the App's State
 * @param {LendingEntry} lendingEntry Modified Lending entry 
 * @returns {LendingInformation}
 */
export const saveLendingInformation = createAsyncThunk('lending/saveLendingInformation', async (lendingEntry: LendingEntry) => {

    const { saveLendingInformation } = LendingService();

    await saveLendingInformation(lendingEntry);
    return lendingEntry;
})


const lendingSlice = createSlice({
    name: 'lending',
    initialState,
    reducers: {
        default(state, action) {
            return state;
        }
    }, 
    extraReducers: builder => {
        builder.addCase(fetchLendingInformation.pending, (state, action) => {
            state.status = 'Processing'
        })
        .addCase(fetchLendingInformation.fulfilled, (state, action) => {
            state.status = 'Idle';

            action.payload.forEach((lendingEntry: LendingEntry) => {
                if (lendingEntry.entity === 'Loan') {
                    state.loan[lendingEntry.field] = lendingEntry;
                } else {
                    state.borrower[lendingEntry.field] = lendingEntry;
                }
            });    
        })
        .addCase(fetchLendingInformation.rejected, (state, action) => {
            state.status = 'Error';
        })
        .addCase(saveLendingInformation.pending, (state, action) => {
            state.status = 'Processing'
        })
        .addCase(saveLendingInformation.fulfilled, (state, action) => {
            if (action.payload.entity === 'Loan') {
                state.loan[action.payload.field] = action.payload;
            } else {
                state.borrower[action.payload.field] = action.payload;
            }
        })
        .addCase(saveLendingInformation.rejected, (state, action) => {
            state.status = 'Error';
        })

    }
});


/**
 * Selector that return all borrower entries from App's State 
 * @param state State's App
 * @returns {Borrower} Borrower Input data
 */
export const selectBorrowers = (state: {lending: LendingStoreState}) => state.lending.borrower;

/**
 * Selector that return all Loan entries from App's State 
 * @param state State's App
 * @returns {Loan} Loan Input data
 */
export const selectLoans = (state: {lending: LendingStoreState}) => state.lending.loan;

/**
 * Selector that return App's State status
 * @param state State's App
 * @returns {LoadingStatus}
 */
export const selectStatus = (state: {lending: LendingStoreState}) => state.lending.status;

export const selectBorrowerEntries = createSelector(
    selectBorrowers,
    borrowers => Object.values(borrowers)
);

export const selectLoanEntries = createSelector(
    selectLoans,
    loans => Object.values(loans)
);


export default lendingSlice.reducer;