import React, { useEffect } from 'react';
import NavBar from '../NavBar';
import Grid from '@mui/material/Grid';
import { Typography,Paper, Button } from '@mui/material';
import restaurantService from '../services/restaurant.service';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";


const EditExtra = () =>{


    const extra_id = useParams();
    const [extra_data, setExtraData] = React.useState({});
    const navigate = useNavigate();


    useEffect(()=>{
        retriveExtra(extra_id.id);
    },[])

    const retriveExtra = async (id) =>{

       

         restaurantService.getExtra(id)
            .then(response =>{
                console.log(response.data['data']);
                setExtraData(response.data['data']);
            })
            .catch(e=>{
                console.log(e);
            })

        
    }

    const handleTextInput = (event) => {

        const { name, value } = event.target;
        if(name === 'price'){
            setExtraData({ ...extra_data, [name]: parseInt(value) });
        }else{
            setExtraData({ ...extra_data, [name]: value });
        }

    }


    const save = () =>{
        console.log(extra_data);
        
        restaurantService.editExtra(extra_id.id, extra_data)
            .then(response =>{

               if(response.data['message'] === "success"){
                    navigate("/manageCakes");
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
                    <Typography fontFamily={'monospace'} align="center" variant="h2" color="text.primary" >Edit {extra_data.name}</Typography>
                    
                </Grid>

                <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            name="name"
                            variant="outlined"
                            sx={{width:"50ch"}}
                            value={extra_data.name || ""}
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
                            value={extra_data.price || ""}
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
                            value={extra_data.image_url || ""}
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

export default EditExtra;