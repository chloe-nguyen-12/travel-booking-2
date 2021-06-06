import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Button,
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const checkoutFormStyles = makeStyles((theme) => ({
  paperContainer: {
    width: "50%",
    padding: "4rem",
    background: ` ${theme.palette.secondary.main}`,
    borderRadius: "18px",
  },
  buttonText: {
    color: "white",
    marginTop: "3rem",
    padding: "0.5rem 1.5rem 0.5rem 1.5rem",
  },
  cardElementContainer: {
    height: "45px",
  },
  cardContainer: {
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "16px",
    borderRadius: "8px",
    marginTop: "3rem",
  },
  topSpacing: {
    marginTop: "2rem",
  },
  inputLabel: {
    color: "white",
  },
}));

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();
  const classes = checkoutFormStyles(theme);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const cardElementOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: `${theme.palette.primary.main}`,
        color: "white",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        border: `1px solid ${theme.palette.primary.main}`,
        fontSmoothing: "antialiased",
        "::placeholder": { color: `white` },
      },
      invalid: {
        iconColor: "red",
        color: "red",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    let amount = 0;
    if (props.prices.length > 0) {
      amount = props.prices.reduce((total, amount) => total + amount);
    }

    const obj = {
      name: name,
      email: email,
      paymentMethod: paymentMethod,
      amount: amount,
    };
    const newObj = JSON.stringify(obj);
    fetch(`/save-stripe-token/${newObj}`, {
      method: "POST",
    }).then((response) => {
      response.json().then((data) => {
        if (data.message) {
          alert(`Payment Successful`);
        } else {
          alert("Payment Failed");
        }
      });
    });
  };

  return (
    <Paper className={classes.paperContainer} elevation={3}>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid item container justify='center' alignItems='center'>
          <Typography variant='h4' className={classes.inputLabel}>
            Payment Information
          </Typography>
          <Grid item xs={12} className={classes.topSpacing}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='my-input' className={classes.inputLabel}>
                Name
              </InputLabel>
              <Input
                id='name'
                className={classes.inputLabel}
                onChange={(e) => {
                  handleNameChange(e);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.topSpacing}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='my-input' className={classes.inputLabel}>
                Email
              </InputLabel>
              <Input
                id='email'
                className={classes.inputLabel}
                onChange={(e) => {
                  handleEmailChange(e);
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item className={classes.cardContainer}>
          <CardElement options={cardElementOptions} />
        </Grid>
        <Grid container item justify='center' xs={12}>
          <Button
            type='submit'
            disabled={!stripe}
            color='primary'
            variant='contained'
            className={classes.buttonText}>
            <Typography variant='h6'>Pay</Typography>
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default CheckoutForm;
