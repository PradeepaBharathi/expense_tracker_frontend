import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const base_url = 'https://expense-tracker-backend-7mhb.onrender.com';


const getToken = () => {
  return localStorage.getItem('token'); 
};

export const fetchExpenseByDate = createAsyncThunk(
    "expenses/fetchExpenseByDate",
    async(_,{rejectWithValue})=>{
        try {
            const token = getToken();
            if (!token) {
              throw new Error("No token found");
            }
            const response = await axios.get(`${base_url}/expense/expensedate`, {
                headers: {
                  'x-auth-token': token 
                }
              });
              console.log(response.data.expenses);
              return response.data.expenses
        } catch (error) {
      return rejectWithValue(error.response.data);
            
        }
    }
)

export const fetchExpense = createAsyncThunk(
    "expenses/fetchExpense",
    async(_,{rejectWithValue})=>{
        try {
            const token = getToken();
            if (!token) {
              throw new Error("No token found");
            }
           
            const response = await axios.get(`${base_url}/expense/getexpense`, {
                headers: {
                  'x-auth-token': token 
                }
              });
              console.log(response.data);
              return response.data.expenses
        } catch (error) {
      return rejectWithValue(error.response.data);
            
        }
    }
)

export const addExpense  = createAsyncThunk(
    "expenses/addExpenses",
    async(expenseData,{rejectWithValue})=>{
        try {
            console.log(expenseData)
            const token = getToken();
            if (!token) {
              throw new Error("No token found");
            }
      
            const response = await axios.post(`${base_url}/expense/addexpense`, expenseData, {
              headers: {
                'x-auth-token': token
              }
            });
            console.log(response)
            return response.data.data;
          } catch (error) {
            return rejectWithValue(error.response.data);
          }
    }
)
const expenseSlice = createSlice({
    name:"expenses",
    initialState:{
        loading:false,
        expenses:[],
        allExpenses:[],
        error:null,
      addExpenseStatus: 'idle', 
        
    },
    reducers: {
        resetAddExpenseStatus: (state) => {
            state.addExpenseStatus = 'idle'; 
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchExpenseByDate.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchExpenseByDate.fulfilled,(state,action)=>{
            state.loading= false;
            state.expenses = action.payload
        })
        .addCase(fetchExpenseByDate.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;  
        })
        .addCase(fetchExpense.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchExpense.fulfilled,(state,action)=>{
            state.loading= false;
            state.allExpenses = action.payload
        })
        .addCase(fetchExpense.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;  
        })
        .addCase(addExpense.pending,(state)=>{
            state.loading=true;
            state.error=null;
          state.addExpenseStatus = 'pending'; 

        })
        .addCase(addExpense.fulfilled,(state,action)=>{
            state.loading= false;
            state.expenses = action.payload;
         toast.success("Expense Added")
         state.addExpenseStatus='succeeded'

        })
        .addCase(addExpense.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        toast.error("Expense not added")

        })
    }
})

export default expenseSlice.reducer