import React, { useState,useEffect } from 'react';
import { TextField, MenuItem, Button, Grid, Container, Typography, Box } from '@mui/material';
import './add.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addExpense } from '../../store/ExpenseSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState([
    'Food', 'Transport', 'Entertainment' 
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expenses= useSelector((state) => state.expenses);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = category === 'custom' ? customCategory : category;
    console.log({ amount, category, date, description });
    dispatch(addExpense({ amount, category:finalCategory, date, description }));
   
  };

  useEffect(()=>{
    if(expenses.addExpenseStatus=='succeeded'){
     
      setTimeout(()=>{
        navigate("/home")
        dispatch({ type: 'expenses/resetAddExpenseStatus' });
      },1000)
    }
  })

 
  return (
    <Box className='main'>
        <ToastContainer/>
        <Container maxWidth="sm" className='add-component'>
      <Typography variant="h4" gutterBottom className='add-title'>
        Add New Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              select
              fullWidth
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            
              <MenuItem value="custom"> Add New Category</MenuItem>
            </TextField>
            {category === 'custom' && (
              <TextField
                label="New Category"
                fullWidth
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter new category"
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={12}>
          <TextField
              label="Date"
              type="date"
              fullWidth
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" className='add-btn'>
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </Box>
  );
};

export default AddExpense;
