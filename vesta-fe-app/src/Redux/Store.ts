import { configureStore } from '@reduxjs/toolkit'
import lendingReducer from './LendingSlice'

const store = configureStore({
  reducer: { lending: lendingReducer }
})

export default store