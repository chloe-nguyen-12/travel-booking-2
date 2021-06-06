import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { addToShoppingCart } from "../../utils/shoppingCart";
import { ShoppingCartContext } from "../ShoppingCart/ShoppingCartContext";

const useStyles = makeStyles((theme) => ({
  root: { border: "1px" },
  paper: { padding: "15px" },
  carDetail: {
    textAlign: "left",
    display: "flex",
    margin: "10px 0",
  },
  carIcon: {
    fontSize: "100px",
  },
  carImage: {
    height: "100%",
    maxHeight: "200px",
    maxWidth: "100%",
  },

  button: {
    color: "white",
  },
}));

const CarCard = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

  const handleCarSelection = (e) => {
    e.preventDefault();
    const carItem = {
      name: `${props.car.name}`,
      price: `${props.car.rate}`,
      type: "car",
    };
    addToShoppingCart(shoppingCart, setShoppingCart, carItem);
  };

  const { car } = props;
  if (car) {
    return (
      <Grid item xs={6} md={4} className={classes.root}>
        <Paper elevation={2} className={classes.paper}>
          <Grid item xs={12} className={classes.carDetail}>
            <Typography variant='h5'>
              <b>{car.name}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.carDetail}>
            <Typography variant='h5' color='textSecondary'>
              Or similar/Sedan
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              src={`${process.env.PUBLIC_URL}/images/${car.imageUrl}.png`}
              alt='Car belongs here!'
              className={classes.carImage}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.carDetail}
            container
            justify='space-between'
            direction='row'>
            <Grid item container xs={6}>
              <Typography variant='h4'>
                <b> ${car.rate}</b>
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                /per day
              </Typography>
            </Grid>

            <Button
              variant='contained'
              size='large'
              className={classes.button}
              onClick={(e) => handleCarSelection(e)}
              color='primary'>
              Select Car
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.carDetail}>
            <Typography variant='h6'>
              <b> ${car.total} Total</b>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
  return <div>No car </div>;
};
export default CarCard;
