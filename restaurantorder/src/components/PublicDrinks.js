import React, { useEffect } from 'react'
import restaurantService from './services/restaurant.service';
import NavBar from "./NavBar";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EuroIcon from '@mui/icons-material/Euro';


const PublicDrinks = () =>{

    const [allDrinks, setAlldrinks] = React.useState([]);
    const [cartItem, setCartItem] = React.useState([]);

    useEffect(() => {
        retriveDrinks();
    }, [])

    


    const retriveDrinks = async () => {

        try {

            const response = await restaurantService.retriveAllDrinks();
            console.log(response.data);
            setAlldrinks(response.data);


        } catch (e) {
            console.log(e);
        }


    }

    const handleAddDrink = (drink) =>{
        let cart_array = [...cartItem];
        cart_array.push(drink.id);
        localStorage.setItem('cart_content', JSON.stringify(cart_array));
        setCartItem(cart_array);
    }


    return(
        <React.Fragment>
            <NavBar cartitem={cartItem.length}/>

<Grid container
    justifyContent="center"
    alignItems="center"
    style={{paddingTop:50}}
>

    
      
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' , boxShadow:5}}>
    {allDrinks.length !== 0 && allDrinks.map((drink) =>(
        <React.Fragment>
        <ListItem alignItems="flex-start" secondaryAction={
        <IconButton edge="end" onClick={() => handleAddDrink(drink)}>
          <AddCircleIcon sx={{ fontSize: 30 }}/>
        </IconButton>
      } >
        <Stack direction="row" spacing={2}>
            <ListItemAvatar>
                <Avatar variant="square" sx={{ width: 100, height: 100 }} alt="Remy Sharp" src={drink.image_url} />
            </ListItemAvatar>

            <Stack direction="column" >
            <ListItemText
                
                primary={<Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="h4"
                    color="text.primary"
                    >
                        {drink.name}</Typography>
                     }
                
            />
            <ListItemText
                
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            {drink.price} <EuroIcon fontSize="small" />
                        </Typography>
                        
                    </React.Fragment>
                }
            />
            </Stack>
        </Stack>
        </ListItem>
        <Divider variant="inset" component="li" />
        </React.Fragment>
    ))}
       
    </List>
   
    

</Grid>
        </React.Fragment>
    );

}

export default PublicDrinks;