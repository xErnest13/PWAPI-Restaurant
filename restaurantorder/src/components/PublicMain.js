import React from "react";
import NavBar from "./NavBar";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from "react-router-dom";

const styled = {
    cardAction: {
      display: 'block',
      textAlign: 'initial'
    }
  }

const PublicMain = () =>{

    const navigate = useNavigate();

    console.log("Main");
    
    const goToFood = () => {
        navigate("/foods");
    }

    const goToDrink = () =>{
        navigate("/drinks");
    }

    const goToCakes = () =>{    
        navigate("/extras");
    }

    return(
        <React.Fragment>
            <NavBar/>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ paddingTop: 50 }}
                spacing={10}

            >

                <Grid item >
                    <Card sx={{ maxWidth: 345, boxShadow: 3 }} >
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                            onClick={() => goToDrink()}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://img.traveltriangle.com/blog/wp-content/uploads/2018/12/Australian-Drinks-Cover.jpg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary">
                                    Drinks
                                </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>
                </Grid>

                <Grid item >
                    <Card  sx={{ maxWidth: 345, boxShadow: 3 }}>
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                            onClick={() => goToFood()}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://media.istockphoto.com/photos/restaurant-healthy-food-delivery-in-take-away-boxes-picture-id1165063882?k=20&m=1165063882&s=612x612&w=0&h=ZECAZwa2RRRBHWymJTC06emyEzyQ_gu6eIvucJ4-nB4="
                                alt="Paella dish"
                            />
                            <CardContent>

                                <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary">
                                    Foods
                                </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>
                </Grid>


                <Grid item >
                    <Card  sx={{ maxWidth: 345, boxShadow: 3 }}>
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                            onClick={() => goToCakes()}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image="http://static1.squarespace.com/static/549367d9e4b0b0a3e2543543/t/5eb3e321ca13f41f1aa02ac3/1588847416783/?format=1500w"
                                alt="Paella dish"
                            />
                            <CardContent>

                                <Typography fontFamily={'monospace'} align="center" variant="h4" color="text.primary">
                                    Cakes
                                </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>
                </Grid>



            </Grid>
        </React.Fragment>
    );
}

export default PublicMain;