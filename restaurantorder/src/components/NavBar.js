import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';


import axiosInstance from '../axiosApi';

import { useNavigate } from "react-router-dom";

const NavBar = ({cartitem}) => {
  
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(()=>{
    console.log(localStorage.getItem('currentUser'));
      if( localStorage.getItem('currentUser') !== 'null'){
        console.log("in if");
        setAuth(true);
      }
  },[auth])

  React.useEffect(()=>{
    console.log("auth", auth);
  },[])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  ///THIS IS THE DRAWER MENU

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
};


const goToFoods = () =>{
   navigate("/manageFoods");
}

const goToDrinks = () =>{
  navigate("/manageDrinks");
}

const goToExtra = () =>{
  navigate("/manageCakes");
}

const goToMain = () =>{
  navigate("/");
}

const handleLogin = () =>{
  navigate("/login");
}

const goToPublicMain = () =>{
  navigate("/");
}

const goToPublicFood = () =>{
  navigate("/foods");
}

const goToPublicDrink = () =>{
  navigate("/drinks");
}

const goToPublicExtra = () =>{
  navigate("/extras");
}

const handleLogout = async () =>{
  try{
    const response = await axiosInstance.post('/authentication/token/delete/', {withCredentials: true});
    if (response.status == 200) {
      localStorage.setItem('currentUser', null);
      localStorage.setItem('currentUserGroups', null);
      localStorage.setItem('currentUserEntity', null);
      setAuth(false);
      navigate('/');
    }
  } catch(error) {
    console.log(error);
  }
}

const goToCart = () =>{
  console.log("go to cart");
}

//menu with auth user
const list_auth = (anchor) => (
    <Box
      
      sx={{ width:200}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

          <ListItem button onClick={() => goToMain()}>
            
            <ListItemText>
                Admin
            </ListItemText>
          </ListItem>

          <ListItem button onClick={() => goToFoods()}>
            
            <ListItemText>
                Manage Foods
            </ListItemText>
          </ListItem>

          <ListItem button onClick={() => goToDrinks()}>
            
            <ListItemText>
                Manage Drinks
            </ListItemText>
            </ListItem>


          <ListItem button onClick={() => goToExtra()}>
            
              <ListItemText>
                 Manage Cakes
              </ListItemText>
          </ListItem>


        
        </List>
      
    </Box>
  );

  //menu without user
  const list = (anchor) => (
    <Box
      
      sx={{ width:200}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

          <ListItem button onClick={() => goToPublicMain()}>
            
            <ListItemText>
                Main
            </ListItemText>
          </ListItem>

          <ListItem button onClick={() => goToPublicFood()}>
            
            <ListItemText>
                Foods
            </ListItemText>
          </ListItem>

          <ListItem button onClick={() => goToPublicDrink()}>
            
            <ListItemText>
                Drinks
            </ListItemText>
            </ListItem>


          <ListItem button onClick={() => goToPublicExtra()}>
            
              <ListItemText>
                 Cakes
              </ListItemText>
          </ListItem>


        
        </List>
      
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
      </FormGroup>
      <AppBar position="static" style={{ background: 'transparent'}}>
        <Toolbar>

        {['left'].map((anchor) => (
                            <React.Fragment key={'left'}>  

                            
          <IconButton
            size="large"
            
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon sx={{color:'black'}} fontSize="large"  />
          </IconButton>
          <SwipeableDrawer
                                   PaperProps={{
                                    sx: {
                                      //backgroundColor: "rgba(62, 45, 32, 0.85)",
                                      color: "black"
                                    }
                                  }}
                                    anchor={'left'}
                                    open={state['left']}
                                    //state[anchor]
                                    onClose={toggleDrawer('left', false)}
                                    onOpen={toggleDrawer('left', true)}
                                >
                                    {auth ?
                                        (list_auth('left')):(list('left'))
                                      }



                                </SwipeableDrawer>
                                </React.Fragment>
                            ))}
          
          <Typography variant="h4" component="div" fontFamily={'monospace'} align="center"  sx={{ flexGrow: 1, color:'black' }}>
                                  TwoSpoons
                            </Typography>
         

         <Stack direction="row" spacing={2}>   

                         
                            
          {auth === true ? (
            <div > 
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle sx={{color:'black'}} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </Menu>
            </div>
          ):(
            <>
             <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
             <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => goToCart()}
              color="inherit"
            >
              <Badge color="error" badgeContent={cartitem}>
              <ShoppingCartIcon sx={{color:'black'}}/>  
              </Badge>
            </IconButton>
            <Tooltip title="LogIn">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLogin}
              color="inherit"
            >
              <AccountCircle sx={{color:'black'}} />
            </IconButton>
            </Tooltip>
            </Box>
            </>)}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
