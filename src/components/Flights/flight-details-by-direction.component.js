import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import CustomTimeline from "./custom-timeline.component";
import { addToShoppingCart } from "../../utils/shoppingCart";
import { ShoppingCartContext } from "../ShoppingCart/ShoppingCartContext";

const useStyles = makeStyles((theme) => ({
  detail: {
    padding: "15px",
    borderBottom: "1px solid #D3D3D3",
  },
  icon: {
    fontSize: "40px",
    paddingRight: "15px",
  },
  button: theme.buttonPrimary,
}));

const FlightDetailsByDirection = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { details, quoteDetails, extraInfo } = props;

  const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

  const handleFlightSelection = (e) => {
    e.preventDefault();
    const flightItem = {
      name: `${details.originPlace} to ${details.destinationPlace}`,
      originPlace: `${details.originPlace}`,
      destinationPlace: `${details.destinationPlace}`,
      price: `${quoteDetails.MinPrice}`,
      type: "flight",
    };
    addToShoppingCart(shoppingCart, setShoppingCart, flightItem);
  };

  return (
    <Grid container xs={12}>
      <Grid container className={classes.detail} justify='space-between'>
        <Grid container xs={12} sm={5} justify='center' alignItems='flex-end'>
          <Grid item>
            {extraInfo ? (
              <FlightTakeoffIcon className={classes.icon} />
            ) : (
              <FlightLandIcon className={classes.icon} />
            )}
          </Grid>
          <Grid item>
            <Typography variant='h6' color='textSecondary'>
              {details.carrierName}
            </Typography>
          </Grid>
        </Grid>
        {extraInfo ? (
          <Grid item xs={12} sm={5}>
            <Typography variant='h5'>${quoteDetails.MinPrice}</Typography>
            <Typography variant='h6' color='textSecondary'>
              round trip
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={12} sm={5}></Grid>
        )}
      </Grid>

      <Grid
        container
        className={classes.detail}
        justify='space-between'
        alignItems='center'>
        <Grid container xs={12} sm={5} justify='center' alignItems='center'>
          <Grid item>
            <Typography variant='h6'>
              <b>Departure</b>
            </Typography>
            <Typography>
              <b>Flight date: {details.departureDate.slice(0, 10)}</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5}>
          {extraInfo ? (
            <Button
              variant='contained'
              size='large'
              className={classes.button}
              onClick={(e) => handleFlightSelection(e)}>
              Select Flight
            </Button>
          ) : null}
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.detail}
        justify='space-between'
        alignItems='center'>
        <Grid container xs={12} sm={5} justify='flex-start' alignItems='center'>
          <Grid item xs={12}>
            <CustomTimeline
              begin={details.originPlace}
              end={details.destinationPlace}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5}></Grid>
      </Grid>
    </Grid>
  );
};

export default FlightDetailsByDirection;
