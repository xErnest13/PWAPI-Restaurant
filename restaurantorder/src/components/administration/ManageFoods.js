import React, { useEffect } from 'react';
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


function AddFood(props) {

    const { onClose, openAddFood } = props;
    

    const [newFood, setNewFood] = React.useState({
        name: "",
        ingredients: "",
        price: "",
        image_url:"",
    });


    const handleTextInput = (event) => {

        const { name, value } = event.target;
        setNewFood({ ...newFood, [name]: value });
        
    }


    const submit = async () => {

        try {

            console.log("new food", newFood);
            setNewFood({ ...newFood, ['price']: parseFloat(newFood.price)})
            console.log("new food price", newFood);

            
            const response = await restaurantService.addFoods(newFood)

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

        <Dialog open={openAddFood} onClose={onClose} sx={{ boxShadow: 3 }}>

            <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary" >Add food</Typography>

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
                            value={newFood.name}
                            onChange={handleTextInput}
                        />

                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Ingredients"
                            variant="outlined"
                            name="ingredients"
                            value={newFood.ingredients}
                            onChange={handleTextInput}
                        />

                    </Grid>


                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            name="price"
                            value={newFood.price}
                            onChange={handleTextInput}
                        />

                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Image URL"
                            variant="outlined"
                            name="image_url"
                            value={newFood.image_url}
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

AddFood.propTypes = {
    onClose: PropTypes.func.isRequired,
    openAddFood: PropTypes.bool.isRequired,
};


//MAIN Component

const ManageFoods = () => {

    const [allFoods, setAllfoods] = React.useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        retriveRestaurantFoodOffers();
    }, [])

    const [openAddFood, setOpenAddFood] = React.useState(false);

    const handleClickOpen = () => {
        setOpenAddFood(true);
    };

    const handleClose = () => {
        retriveRestaurantFoodOffers();
        setOpenAddFood(false);
    };



    const retriveRestaurantFoodOffers = async () => {

        try {

            const response = await restaurantService.retriveAllFoods();
            console.log(response.data);
            setAllfoods(response.data);


        } catch (e) {
            console.log(e);
        }
    }

    const goToEdit = (foodid) =>{
        console.log(foodid);

        navigate("/edit_food/"+foodid);
    }


    return (
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
                    <AddFood openAddFood={openAddFood} onClose={handleClose} />
                </Grid>


                <Grid item >

                    <Grid container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={5}
                    >

                        {allFoods !== undefined && allFoods.map((food_item) => (<>
                            <Grid item key={food_item.id}>

                                <Card sx={{ maxWidth: 345, boxShadow: 3 }} key={food_item.id}>
                                    <ButtonBase
                                        style={{
                                            display: 'block',
                                            textAlign: 'initial'
                                        }}
                                    onClick={() => goToEdit(food_item.id)}
                                    >
                                        <CardHeader
                                            avatar={
                                                <Avatar color="primary" aria-label="recipe">
                                                    {food_item.id}
                                                </Avatar>
                                            }

                                            title={food_item.name}
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={food_item.image_url}
                                            alt="Paella dish"
                                        />
                                        <CardContent>

                                            
                                            <Typography fontFamily={'monospace'} align="center" variant="body1" color="text.primary">
                                                {food_item.ingredients}
                                            </Typography>

                                            
                                            <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary">
                                                {food_item.price} <EuroIcon fontSize="medium" />
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


export default ManageFoods;