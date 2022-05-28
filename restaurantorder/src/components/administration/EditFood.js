import React, { useEffect } from 'react';
import NavBar from '../NavBar';
import Grid from '@mui/material/Grid';
import { Typography,Paper, Button } from '@mui/material';
import restaurantService from '../services/restaurant.service';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";




const EditFood = () =>{


    const food_id = useParams();
    const [food_data, setFoodData] = React.useState({});
    const navigate = useNavigate();


    useEffect(()=>{
        retriveFood(food_id.id);
    },[])

    const retriveFood = async (id) =>{

       

         restaurantService.getFood(id)
            .then(response =>{
                console.log(response.data['data']);
                setFoodData(response.data['data']);
            })
            .catch(e=>{
                console.log(e);
            })

        
    }

    const handleTextInput = (event) => {

        const { name, value } = event.target;
        setFoodData({ ...food_data, [name]: value });
        

    }


    const save = () =>{
        console.log(food_data);
        
        restaurantService.editFood(food_id.id, food_data)
            .then(response =>{

               if(response.data['message'] === "success"){
                    navigate("/manageFoods");
               }

            })
            .catch(e =>{
                console.log(e);
            })

    }

    return(
        <React.Fragment>
            <NavBar/>

            <Grid
                container
                style={{ paddingTop: 50 }}
                justifyContent="center"
                alignItems="center"
               

            >
            <Paper elevation={6} sx={{width: 700, borderRadius:20}}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ paddingTop: 20 }}
                spacing={3}

            >
                

                <Grid item xs>
                    <Typography fontFamily={'monospace'} align="center" variant="h2" color="text.primary" >Edit {food_data.name}</Typography>
                    
                </Grid>

                <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            name="name"
                            variant="outlined"
                            sx={{width:"50ch"}}
                            value={food_data.name || ""}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            onChange={handleTextInput}
                        />

                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Ingredients"
                            variant="outlined"
                            name="ingredients"
                            sx={{width:"50ch"}}
                            multiline
                            rows={3}
                            value={food_data.ingredients || ""}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            onChange={handleTextInput}
                        />

                    </Grid>


                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            name="price"
                            sx={{width:"50ch"}}
                            value={food_data.price || ""}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            onChange={handleTextInput}
                        />

                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Image URL"
                            variant="outlined"
                            name="image_url"
                            sx={{width:"50ch"}}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            value={food_data.image_url || ""}
                            onChange={handleTextInput}
                        />

                    </Grid>

                    <Grid item xs>
                        <Button color="primary" variant='contained' onClick={() => save()}>Save</Button>
                    </Grid>

                    <Grid item xs>

                    </Grid>
                   
            </Grid>
            </Paper>
            </Grid>

        </React.Fragment>
    );
}

export default EditFood;