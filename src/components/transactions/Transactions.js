import React, { useEffect, useState } from "react";
import "./transactions.css";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpense } from "../../store/ExpenseSlice";
import Filters from "../filters/Filters";
import { saveAs } from 'file-saver';
function Transactions() {
  const [filters,setFilters] = useState({category:"",sort:'date'})
  const dispatch = useDispatch();
  const  expenses  = useSelector((state) => state.expenses.allExpenses);
  
  
  useEffect(() => {
    dispatch(fetchExpense());
  }, [dispatch]);
  console.log(expenses);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate())
    return `${year}-${month}-${day}`;
  };

  const filteredExpenses = expenses.filter((expense)=>{
    if(filters.category && expense.category !== filters.category){
      return false
    }
    return true;
  })
  .sort((a,b)=>{
    if (filters.sort === 'date') {
      return new Date(a.date) - new Date(b.date);
    }
    if (filters.sort === 'amount') {
      return a.amount - b.amount;
    }
    if (filters.sort === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  })

  const exportToCSV = () => {
    const csvRows = [];
   
    csvRows.push(['Category', 'Amount', 'Date'].join(','));

   
    filteredExpenses.forEach(expense => {
      csvRows.push([
        expense.category,
        expense.amount,
        formatDate(expense.date),
      ].join(','));
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'expenses.csv');
  };
  return (
    <Box className="main">
      <Box className="trans-component">

     <Box className='t-filter'>
     <Filters filters={filters} setFilters={setFilters} />
     </Box>

        <Box className="t-list">
        <Typography> Transactions</Typography>
        <Button variant="contained" className="csv-btn" onClick={exportToCSV}>
            Export to CSV
          </Button>
        {filteredExpenses.length > 0 ? (
            filteredExpenses.map((val) => (
              <List key={val._id} className='transaction'>
                <ListItem>{val.category}</ListItem>
                <ListItem>${val.amount}</ListItem>
                <ListItem>{formatDate(val.date)}</ListItem>
              </List>
            ))
          ) : (
            <Typography>No Expenses Found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Transactions;
