import React, {useEffect} from 'react';
import NavBar from '../NavBar';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import ButtonBase from '@mui/material/ButtonBase';
import EuroIcon from '@mui/icons-material/Euro';

import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

//Services
import restaurantService from '../services/restaurant.service';


function AddDrink(props) {

    const { onClose, openAddDrink } = props;
    

    const [newDrink, setNewDrink] = React.useState({
        name: "",
        price: "",
        image_url:"",
    });


    const handleTextInput = (event) => {

        const { name, value } = event.target;
        setNewDrink({ ...newDrink, [name]: value });

    }


    const submit = async () => {

        try {

            console.log("new drink", newDrink);

            const response = await restaurantService.addDrinks(newDrink);

            console.log("response", response.data);

            if (response.data['message'] === "success") {
                onClose();
            } else {
                console.log('save error');
            }

        } catch (e) {
            console.log(e);
        }
    }


    return (

        <Dialog open={openAddDrink} onClose={onClose} sx={{ boxShadow: 3 }}>

            <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary" >Add drink</Typography>

            <DialogContent>

                <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                >

                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            name="name"
                            variant="outlined"
                            value={newDrink.name}
                            onChange={handleTextInput}
                        />

                    </Grid>


                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            name="price"
                            value={newDrink.price}
                            onChange={handleTextInput}
                            type="number"
                        />

                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Image URL"
                            variant="outlined"
                            name="image_url"
                            value={newDrink.image_url}
                            onChange={handleTextInput}
                        />

                    </Grid>

                    <Grid item xs>
                        <Button color="primary" variant='contained' onClick={() => submit()}>
                            Save
                        </Button>
                    </Grid>

                </Grid>
            </DialogContent>
        </Dialog>


    );
}

AddDrink.propTypes = {
    onClose: PropTypes.func.isRequired,
    openAddDrink: PropTypes.bool.isRequired,
};


//MAIN Component

const ManageDrinks = () =>{

    const [allDrinks, setAllDrinks] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        retriveRestaurantDrinksOffers();
    }, [])


    const [openAddDrink, setOpenAddDrink] = React.useState(false);

    const handleClickOpen = () => {
        setOpenAddDrink(true);
    };

    const handleClose = () => {
        retriveRestaurantDrinksOffers();
        setOpenAddDrink(false);
    };


    const retriveRestaurantDrinksOffers = async () =>{

        try{

            const response = await restaurantService.retriveAllDrinks();
            console.log(response.data);
            setAllDrinks(response.data);
            

        }catch(e){
            console.log(e);
        }
    }

    const goToEdit = (drinkid) =>{
        console.log(drinkid);

        navigate("/edit_drink/"+drinkid);
    }

    return(
        <React.Fragment>

<NavBar />



<Grid container
    direction="column"
    justifyContent="center"
    alignItems="center"
    style={{ paddingTop: 30 }}
    spacing={10}>


    <Grid item xs>
        <IconButton aria-label="Add" size="large" onClick={() => handleClickOpen()}>
            <AddCircleIcon color="primary" sx={{ fontSize: 80 }} />
        </IconButton>
        <AddDrink openAddDrink={openAddDrink} onClose={handleClose} />
    </Grid>


    <Grid item >

        <Grid container
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={5}
        >

            {allDrinks !== undefined && allDrinks.map((drink_item) => (<>
                <Grid item key={drink_item.id}>

                    <Card sx={{ maxWidth: 345, boxShadow: 3 }} key={drink_item.id}>
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                        onClick={() => goToEdit(drink_item.id)}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar color="primary" aria-label="recipe">
                                        {drink_item.id}
                                    </Avatar>
                                }

                                title={drink_item.name}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={drink_item.image_url}
                                alt="Paella dish"
                            />
                            <CardContent>

                            <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary">
                                                {drink_item.price} <EuroIcon fontSize="medium" />
                                            </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>

                </Grid>
            </>))}
        </Grid>

    </Grid>

</Grid>
        

        </React.Fragment>
    );

}

export default ManageDrinks;