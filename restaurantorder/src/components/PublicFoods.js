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

const PublicFoods = () => {

    const [allFoods, setAllfoods] = React.useState([]);
    const [cartItem, setCartItem] = React.useState([]);

    useEffect(() => {
        retriveFoods();
    }, [])

    


    const retriveFoods = async () => {

        try {

            const response = await restaurantService.retriveAllFoods();
            console.log(response.data);
            setAllfoods(response.data);


        } catch (e) {
            console.log(e);
        }


    }

    const handleAddFood = (food)  =>{
        let cart_array = [...cartItem];
        cart_array.push(food.id);
        localStorage.setItem('cart_content', JSON.stringify(cart_array));
        setCartItem(cart_array);
    } 

    useEffect(() =>{
        console.log("HE::PSDA",cartItem);
        console.log(localStorage.getItem('cart_content'));
    },[cartItem])

    return (
        <React.Fragment>
            <NavBar cartitem={cartItem.length}/>

            <Grid container
                justifyContent="center"
                alignItems="center"
                style={{paddingTop:50}}
            >

                
                  
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' , boxShadow:5}}>
                {allFoods.length !== 0 && allFoods.map((food) =>(
                    <React.Fragment>
                    <ListItem alignItems="flex-start" secondaryAction={
                    <IconButton edge="end" onClick={() => handleAddFood(food)}>
                      <AddCircleIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                  } >
                    <Stack direction="row" spacing={2}>
                        <ListItemAvatar>
                            <Avatar variant="square" sx={{ width: 100, height: 100 }} alt="Remy Sharp" src={food.image_url} />
                        </ListItemAvatar>

                        <Stack direction="column" >
                        <ListItemText
                            
                            primary={<Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="h4"
                                color="text.primary"
                                >
                                    {food.name}</Typography>
                                 }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="h6"
                                        color="text.primary"
                                    >
                                        {food.ingredients}
                                    </Typography>
                                    
                                </React.Fragment>
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
                                        {food.price} <EuroIcon fontSize="small" />
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

export default PublicFoods;