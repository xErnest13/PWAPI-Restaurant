import React, { useEffect } from 'react';
import NavBar from '../NavBar';
import Grid from '@mui/material/Grid';
import { Typography,Paper, Button } from '@mui/material';
import restaurantService from '../services/restaurant.service';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";


const EditDrink = () =>{

    const drink_id = useParams();
    const [drink_data, setDrinkData] = React.useState({});
    const navigate = useNavigate();


    useEffect(()=>{
        retriveDrink(drink_id.id);
    },[])

    const retriveDrink = async (id) =>{

       

         restaurantService.getDrink(id)
            .then(response =>{
                console.log(response.data['data']);
                setDrinkData(response.data['data']);
            })
            .catch(e=>{
                console.log(e);
            })

        
    }

    const handleTextInput = (event) => {

        const { name, value } = event.target;
        if(name === 'price'){
            setDrinkData({ ...drink_data, [name]: parseInt(value) });
        }else{
            setDrinkData({ ...drink_data, [name]: value });
        }

    }


    const save = () =>{
        console.log(drink_data);
        
        restaurantService.editDrink(drink_id.id, drink_data)
            .then(response =>{

               if(response.data['message'] === "success"){
                    navigate("/manageDrinks");
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
                    <Typography fontFamily={'monospace'} align="center" variant="h2" color="text.primary" >Edit {drink_data.name}</Typography>
                    
                </Grid>

                <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            name="name"
                            variant="outlined"
                            sx={{width:"50ch"}}
                            value={drink_data.name || ""}
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
                            type="number"
                            value={drink_data.price || ""}
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
                            value={drink_data.image_url || ""}
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

export default EditDrink;