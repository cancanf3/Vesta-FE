import { configureStore } from '@reduxjs/toolkit'
import lendingReducer from './LendingSlice'

const store = configureStore({
  reducer: { lending: lendingReducer },
  devTools: true
})

export default store