import { Box, Button, MenuItem, TextField } from '@mui/material'
import React from 'react'
import './filters.css'
function Filters({filters,setFilters}) {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
      };
  return (
    <Box className='filters'>
        <TextField label="Category"
        select
        name="category"
        value={filters.category}
        onChange={handleFilterChange}
        fullWidth
        className='filter-txt'>
              <MenuItem value="">All</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Transport">Transport</MenuItem>
        <MenuItem value="Entertainment">Entertainment</MenuItem>
        </TextField>
        <TextField
        label="Sort by"
        select
        name="sort"
        value={filters.sort}
        onChange={handleFilterChange}
        fullWidth
        className='filter-txt'
      >
        <MenuItem value="date">Date</MenuItem>
        <MenuItem value="category">Category</MenuItem>
        <MenuItem value="amount">Amount</MenuItem>
      </TextField>

      <Button
        variant="contained"
        className='filter-btn'
        onClick={() => setFilters({ category: '', sort: '' })}
      >
        Reset Filters
      </Button>
    </Box>
  )
}

export default Filters