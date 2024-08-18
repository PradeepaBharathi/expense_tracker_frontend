import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import'./login.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../store/UserSlice";
function Login() {
  const [account, toggleAccount] = useState("login");
  const[username,setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("")
  const [message, setMessage] = useState('');


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, user } = useSelector((state) => state.user);
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    let credentials = { email, password };
    dispatch(loginUser(credentials))
};

const handleSignup = (e) => {
    e.preventDefault();
    let userData = { username, email, password,confirmPassword};
    dispatch(signupUser(userData))
};

useEffect(() => {
  if (user) {
  navigate("/home")
  }
 
}, [user, error, navigate]);
  return (
    <Box className="login-form">
      <ToastContainer/>
        <h2 className="title">EXPENSE TRACKER</h2>
      {account === "login" ? (
        <Box className="details">
          <TextField
            id="filled-basic"
            label=" email"
            variant="standard"
            name="loginemail"
              value={email}
             onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Password"
            type="password"
            name="loginPassword"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            id="login-button"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography id="text" variant="h5">
            OR
          </Typography>
          <Button
            id="sign-up"
            variant="outlined"
            onClick={() => toggleSignup()}
          >
            Create An Account
          </Button>
          
        </Box>
      ) : (
        <Box className="details">
          <TextField
            id="filled-basic"
            onChange={(e) => setName(e.target.value)}
            name="Name"
            inputProps={{
              type: "text",
              className: "no-hover",
            }}
            label=" Enter Your Name"
            variant="standard"
          />
          <TextField
            id="filled-basic"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            inputProps={{
              type: "text",
              className: "no-hover",
            }}
            label=" email"
            variant="standard"
          />
          <TextField
            id="filled-basic"
            onChange={(e) => setPassword(e.target.value)}
            name="Password"
            inputProps={{
              type: "password",
              className: "no-hover",
            }}
            label="Password"
            variant="standard"
          />
          <TextField
            id="filled-basic"
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            inputProps={{
              type: "confirmpassword",
              className: "no-hover",
            }}
            label="confirmPassword"
            variant="standard"
          />
          <Button
            id="login-button"
            variant="contained"
               onClick={handleSignup}
          >
            Signup
          </Button>
          <Typography id="text" variant="h5">
            OR
          </Typography>
          <Button
            id="sign-up"
            variant="outlined"
            onClick={() => toggleSignup()}
          >
            Already Have An Account
          </Button>
          <p id="message">{message}</p>
       
        </Box>
      )}
    </Box>
  );
}

export default Login;
