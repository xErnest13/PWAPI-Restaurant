import React,{ useEffect } from 'react';
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


function AddExtra(props) {

    const { onClose, openAddExtra } = props;
    

    const [newExtra, setNewExtra] = React.useState({
        name: "",
        price: "",
        image_url:"",
    });


    const handleTextInput = (event) => {

        const { name, value } = event.target;
        setNewExtra({ ...newExtra, [name]: value });

    }


    const submit = async () => {

        try {

            console.log("new food", newExtra);

            const response = await restaurantService.addExtras(newExtra)

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

        <Dialog open={openAddExtra} onClose={onClose} sx={{ boxShadow: 3 }}>

            <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary" >Add extra</Typography>

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
                            value={newExtra.name}
                            onChange={handleTextInput}
                        />

                    </Grid>


                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            name="price"
                            value={newExtra.price}
                            onChange={handleTextInput}
                        />

                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="outlined-basic"
                            label="Image URL"
                            variant="outlined"
                            name="image_url"
                            value={newExtra.image_url}
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

AddExtra.propTypes = {
    onClose: PropTypes.func.isRequired,
    openAddExtra: PropTypes.bool.isRequired,
};


//MAIN Component

const ManageExtra = () =>{

    const [allExtras, setAllExtras] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        retriveRestaurantExtraOffers();
    }, [])

    const [openAddExtra, setOpenAddExtra] = React.useState(false);

    const handleClickOpen = () => {
        setOpenAddExtra(true);
    };

    const handleClose = () => {
        retriveRestaurantExtraOffers();
        setOpenAddExtra(false);
    };


    const retriveRestaurantExtraOffers = async () =>{

        try{

            const response = await restaurantService.retriveAllExtra();
            console.log(response.data);
            setAllExtras(response.data);
            

        }catch(e){
            console.log(e);
        }
    }

    const goToEdit = (extraid) =>{
        console.log(extraid);

        navigate("/edit_extra/"+extraid);
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
        <AddExtra openAddExtra={openAddExtra} onClose={handleClose} />
    </Grid>


    <Grid item >

        <Grid container
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={5}
        >

            {allExtras !== undefined && allExtras.map((extra_item) => (<>
                <Grid item key={extra_item.id}>

                    <Card sx={{ maxWidth: 345, boxShadow: 3 }} key={extra_item.id}>
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                        onClick={() => goToEdit(extra_item.id)}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar color="primary" aria-label="recipe">
                                        {extra_item.id}
                                    </Avatar>
                                }

                                title={extra_item.name}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={extra_item.image_url}
                                alt="Paella dish"
                            />
                            <CardContent>


                                
                                <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary">
                                    {extra_item.price} <EuroIcon fontSize="medium" />
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

export default ManageExtra;