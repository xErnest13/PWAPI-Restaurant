import React, { useState } from "react";
import axiosInstance from "../../axiosApi";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from "react-router-dom";


  

const Login = () =>{

    const [Userdata, setUserdata] = React.useState({ username: "", password: "" });
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleInputChanges = (event) => {
        const { name, value } = event.target;
        setUserdata({ ...Userdata, [name]: value });
    };
  
  
    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axiosInstance.post(
            "/authentication/token/obtain/",
            { username: Userdata.username, password: Userdata.password }
          );
    
          if (response.status === 200) {
            let base64User = response.data.access.split(".")[1];
            base64User = JSON.parse(window.atob(base64User));
            localStorage.setItem("currentUser_email", base64User.email);
            localStorage.setItem("currentUser", base64User.user);
            navigate("/manageMain"); // Push home
          }
        } catch (error) {
          setError(error.response.data.detail);
        }
    };

    return(
        <React.Fragment>
            <Container component="main" maxWidth="xs" style={{padding:50}}>
      <CssBaseline />
       
      <div style={{ display: "flex",
      flexDirection: "column",
      alignItems: "center",}}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form style={{ width: "100%"}} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={Userdata.username}
            onChange={handleInputChanges}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={Userdata.password}
            onChange={handleInputChanges}
            autoComplete="current-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Sign In
          </Button>
          {error && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
          
        </form>
      </div>
    </Container>
        </React.Fragment>
    );
  

}

export default Login;