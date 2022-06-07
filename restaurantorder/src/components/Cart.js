import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CakeIcon from '@mui/icons-material/Cake';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import restaurantService from './services/restaurant.service';
import { useNavigate } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Cart = () =>{
    
    const [drinks, setDrinks] = React.useState([]);
    const [foods, setFoods] = React.useState([]);
    const [cakes, setCakes] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [total, setTotal] = React.useState(0);
    const navigate = useNavigate();


    const [order, setOrder] = React.useState({
        address:"",
        tel:"",
    })
     

    useEffect(()=>{
        setDrinks(JSON.parse(localStorage.getItem('drink_content')));
        setFoods(JSON.parse(localStorage.getItem('food_content')));
        setCakes(JSON.parse(localStorage.getItem('extra_content')));
    },[])

    const handleDeleteDrink = (drink) =>{
        console.log(drink);
        var array = [...drinks]; 
        var index = array.indexOf(drink)
        if (index !== -1) {
            array.splice(index, 1);
            setDrinks(array);
        }
    } 

    const handleDeleteFood = (food) =>{
        console.log(food);
        var array = [...foods]; 
        var index = array.indexOf(food)
        if (index !== -1) {
            array.splice(index, 1);
            setFoods(array);
        }
    }

    const handleDeleteCakes = (cake) =>{
        console.log(cake);
        var array = [...cakes]; 
        var index = array.indexOf(cake)
        if (index !== -1) {
            array.splice(index, 1);
            setCakes(array);
        }
    }


    const handleTextInput = (event) =>{
        const { name, value } = event.target;
        setOrder({ ...order, [name]: value });
    }
    

    const takeOrder = () =>{
        console.log("drinks", drinks);
        console.log("foods", foods);
        console.log("extras", cakes);
        
        

       

        let drinks_price = 0;
        let foods_price = 0;
        let extras_price = 0;

        for (let i = 0; i < drinks.length; i++) {
            drinks_price = drinks_price +  parseFloat(drinks[i].price);
        }

        for (let i = 0; i < foods.length; i++) {
            foods_price = foods_price +  parseFloat(foods[i].price);
        
        }

        for (let i = 0; i < cakes.length; i++) {
            extras_price = extras_price +  parseFloat(cakes[i].price);
        
        }

        let total = drinks_price + foods_price + extras_price;

        let data = {
            "adress":order.address,
            "phone":order.tel,
            "price":total,
            "drinks": drinks,
            "foods":foods,
            "extras":cakes,
        }

        
        
        
        restaurantService.createOrder(data)
            .then(response => {
                console.log(response);
                if(response.data['message'] === 'success'){
                    setTotal(total);
                    setOpen(true);
                }
            })
            .catch(e =>{
                console.log(e);
            })
        
    }


    

    const handleOk = () =>{
        navigate("/");
    } 

    return(
        <React.Fragment>
            <NavBar />

            <Grid container
                justifyContent="center"
                alignItems="center"
                direction="column"
                style={{ paddingTop: 50 }}
            >   

            

<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', boxShadow:12 }}>
      <nav aria-label="main mailbox folders">
        <List>
        { ((drinks !== null) && (drinks.length !== 0)) && drinks.map((drink) =>
        <Tooltip title="Delete this item from order list">
          <ListItem disablePadding key={drink.id}>
            <ListItemButton onClick={() => handleDeleteDrink(drink)}> 
              <ListItemIcon>
                <SportsBarIcon />
              </ListItemIcon>
              <ListItemText primary={drink.name} secondary={drink.price} />
            </ListItemButton>
          </ListItem>
          </Tooltip>
          )
        }
         <Divider />
         { ((foods !== null) && (foods.length !== 0)) && foods.map((food) =>
         <Tooltip title="Delete this item from order list">
          <ListItem disablePadding onClick={() => handleDeleteFood(food)}>
            <ListItemButton>
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary={food.name} secondary={food.price} />
            </ListItemButton>
          </ListItem>
          </Tooltip>
          )
        }
        <Divider />
        { ((cakes !== null) && (cakes.length !== 0)) && cakes.map((cake) =>
        <Tooltip title="Delete this item from order list">
          <ListItem disablePadding onClick={() => handleDeleteCakes(cake)}>
            <ListItemButton>
              <ListItemIcon>
                <CakeIcon />
              </ListItemIcon>
              <ListItemText primary={cake.name} secondary={cake.price} />
            </ListItemButton>
          </ListItem>
          </Tooltip>
          )
        }
          
        </List>
      </nav>
      
    </Box>

    <br/>
    
    <Grid
                container
                style={{ paddingTop: 50 }}
                justifyContent="center"
                alignItems="center"


            >
                <Paper elevation={6} sx={{ width: 500, borderRadius: 20 }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{ paddingTop: 20 }}
                        spacing={3}

                    >

                        <Grid item xs>
                        <TextField
                                id="outlined-basic"
                                label="Address"
                                name="address"
                                variant="outlined"
                                value={order.address}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleTextInput}
                            />
                        </Grid>

                        <Grid item xs>
                        <TextField
                                id="outlined-basic"
                                label="Tel"
                                name="tel"
                                variant="outlined"
                                value={order.tel}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleTextInput}
                            />
                        </Grid>

                        <Grid item xs>
                        <Button variant="contained" align="center" onClick={() => takeOrder()}>Take your order</Button>
                        </Grid>  

                        <Grid item xs>

                        </Grid>
                 </Grid>
                </Paper>
    </Grid>
    
    
    
    

            </Grid>

        
            <React.Fragment>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"SUCCESS"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your total price:{total}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleOk} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            

        </React.Fragment>
    );
}

export default Cart;