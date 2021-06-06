import React, { useContext, useEffect } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { Typography, Grid } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { deleteFromShoppingCart } from "../../utils/shoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import FlightIcon from "@material-ui/icons/Flight";
import axios from "axios";
import ApartmentIcon from "@material-ui/icons/Apartment";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";

const shoppingCartStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    minWidth: "400px",
  },
  cartItemsContainer: {
    marginTop: "1.5rem",
  },
  flightContainer: { marginTop: "2rem" },
  itemPrice: {
    fontStyle: "italic",
  },
  totalTopSpacing: {
    marginTop: "2rem",
  },
  totalLeftSpacing: {
    marginLeft: "0.5rem",
  },
  checkoutSpacing: {
    marginTop: "1rem",
  },
  destinationText: {
    marginTop: "1rem",
  },
  XSpacing: {
    marginLeft: "0.5rem",
  },
}));

function ShoppingCartPopoverContent(props) {
  const theme = useTheme();
  const classes = shoppingCartStyles(theme);
  const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

  let car,
    hotel,
    flight = false;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await axios.get("/shopping-cart/get-cart").then((data) => {
          setShoppingCart(data.data.cart);
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchCart();
  }, []);

  let prices = [];

  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].type === "car") {
      car = shoppingCart[i];
    }
    if (shoppingCart[i].type === "hotel") {
      hotel = shoppingCart[i];
    }
    if (shoppingCart[i].type === "flight") {
      flight = shoppingCart[i];
    }
    prices.push(parseInt(shoppingCart[i].price));
  }

  const totalCartText = () => {
    return (
      <>
        <Grid item>
          <Typography variant='h6'>Total: {""} </Typography>
        </Grid>
        <Grid item className={classes.totalLeftSpacing}>
          <Typography variant='h6'>
            ${prices.reduce((total, amount) => total + amount)}
          </Typography>
        </Grid>
      </>
    );
  };

  const emptyCartText = () => {
    return <Typography variant='h6'> Empty Cart! </Typography>;
  };

  const checkOutCartText = () => {
    return (
      <Grid item className={classes.checkoutSpacing}>
        <Link to='/checkout' onClick={() => props.cbExit()}>
          <Typography variant='body1'>Click Here For Checkout</Typography>
        </Link>
      </Grid>
    );
  };

  const handleDeleteFromShoppingCart = (e, item) => {
    deleteFromShoppingCart(shoppingCart, setShoppingCart, item);
  };

  return (
    <Grid
      container
      className={classes.container}
      direction='column'
      justify='center'
      alignItems='center'>
      <Grid item xs={12}>
        <Typography variant={"h4"}>Shopping Cart</Typography>
      </Grid>

      {flight ? (
        <Grid container item className={classes.flightContainer}>
          <FlightIcon fontSize='large' color='secondary' />
          <Grid
            item
            xs={12}
            container
            justify='space-between'
            alignItems='center'>
            <Grid
              item
              container
              xs={6}
              direction='column'
              className={classes.destinationText}>
              <Typography variant='body1'>
                <strong>{flight.originPlace}</strong>
              </Typography>
              <Typography variant='body1'>to</Typography>
              <Typography variant='body1'>
                <strong>{flight.destinationPlace}</strong>
              </Typography>
            </Grid>
            <Grid item container xs={6} justify='flex-end' alignItems='center'>
              <Typography variant='h6'>${flight.price}</Typography>
              <CloseIcon
                onClick={(e) => handleDeleteFromShoppingCart(e, flight)}
                className={classes.XSpacing}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : null}

      {hotel ? (
        <Grid
          item
          container
          className={classes.totalTopSpacing}
          direction='column'>
          <Grid item>
            <ApartmentIcon fontSize='large' color='secondary' />
            <Grid
              item
              xs={12}
              container
              justify='space-between'
              alignItems='center'>
              <Grid item container xs={6} direction='column'>
                <Typography variant='body1'>
                  <strong>{hotel.name}</strong>
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={6}
                justify='flex-end'
                alignItems='center'>
                <Typography variant='h6'>${hotel.price}</Typography>
                <CloseIcon
                  onClick={(e) => handleDeleteFromShoppingCart(e, hotel)}
                  className={classes.XSpacing}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}

      {car ? (
        <Grid
          item
          container
          className={classes.totalTopSpacing}
          direction='column'>
          <Grid item>
            <DirectionsCarIcon
              fontSize='large'
              color='secondary'></DirectionsCarIcon>
            <Grid
              item
              xs={12}
              container
              justify='space-between'
              alignItems='center'>
              <Grid item container xs={6} direction='column'>
                <Typography variant='body1'>
                  <strong>{car.name}</strong>
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={6}
                justify='flex-end'
                alignItems='center'>
                <Typography variant='h6'>${car.price}</Typography>
                <CloseIcon
                  onClick={(e) => handleDeleteFromShoppingCart(e, car)}
                  className={classes.XSpacing}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}

      <Grid item justify='center' container className={classes.totalTopSpacing}>
        {prices.length > 0 ? totalCartText() : emptyCartText()}
      </Grid>
      {prices.length > 0 ? checkOutCartText() : null}
    </Grid>
  );
}

export default ShoppingCartPopoverContent;
