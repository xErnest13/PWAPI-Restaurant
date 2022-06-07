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

const PublicExtras = () =>{

    const [allExtras, setAllextras] = React.useState([]);
    const [cartItem, setCartItem] = React.useState([]);

    useEffect(() => {
        retriveExtras();
    }, [])

    


    const retriveExtras = async () => {

        try {

            const response = await restaurantService.retriveAllExtra();
            console.log(response.data);
            setAllextras(response.data);


        } catch (e) {
            console.log(e);
        }


    }

    const handleAddExtra = (extra) =>{
        let cart_array = [...cartItem];
        cart_array.push(extra);
        localStorage.setItem('extra_content', JSON.stringify(cart_array));
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
    {allExtras.length !== 0 && allExtras.map((extra) =>(
        <React.Fragment>
        <ListItem alignItems="flex-start" secondaryAction={
        <IconButton edge="end" onClick={() => handleAddExtra(extra)}>
          <AddCircleIcon sx={{ fontSize: 30 }}/>
        </IconButton>
      } >
        <Stack direction="row" spacing={2}>
            <ListItemAvatar>
                <Avatar variant="square" sx={{ width: 100, height: 100 }} alt="Remy Sharp" src={extra.image_url} />
            </ListItemAvatar>

            <Stack direction="column" >
            <ListItemText
                
                primary={<Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="h4"
                    color="text.primary"
                    >
                        {extra.name}</Typography>
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
                            {extra.price} <EuroIcon fontSize="small" />
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

export default PublicExtras;