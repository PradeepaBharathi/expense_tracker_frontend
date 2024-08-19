import { Box, Button } from '@mui/material'
import React from 'react'
import'../account/acc.css'
import { useNavigate } from 'react-router-dom';
function Final() {
  const navigate = useNavigate()
    const handleLogin =()=>{
      
        navigate("/")
    }
  return (
    <Box className='main'>
        <Box className='acc-container'>
          <h5>Please Login to Continue</h5>
            <Button className='logout-btn' variant='contained' onClick={handleLogin}>Login</Button>
        </Box>
    </Box>
  )
}

export default Final