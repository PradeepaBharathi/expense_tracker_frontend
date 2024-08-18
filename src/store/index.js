import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import expenseReducer from "./ExpenseSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        expenses:expenseReducer
        
    }
})

export default store