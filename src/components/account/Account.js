import { Box, Button } from '@mui/material'
import React from 'react'
import'./acc.css'
import { useNavigate } from 'react-router-dom';
function Account() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const navigate = useNavigate()
    const handleLogout =()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate("/")
    }
  return (
    <Box className='main'>
        <Box className='acc-container'>
            <h4> MY ACCOUNT</h4>
            {user ? (
                    <Box className='acc-details'>
                        <Box>Name: {user.username}</Box>
                        <Box>Email: {user.email}</Box>
                       
                       
                    </Box>
                ) : (
                    <Box>No user information available</Box>
                )}
            <Button className='logout-btn' variant='contained' onClick={handleLogout}>LogOut</Button>
        </Box>
    </Box>
  )
}

export default Account