import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

//The existence of this component is primarily so the CarRentalPage is not rerendered everytime
//a search element (such as return location) is changed

const useStyles = makeStyles({
  searchItemContainer: {
    padding: "0 10px",
    border: "1px solid #A9A9A9",
    borderRadius: "10px",
  },
  searchItem: {
    textAlign: "left",
    padding: "10px 5px",
  },
  right: {
    borderLeft: "1px solid #A9A9A9",
  },
  textField: {
    "& .MuiInputLabel-root": {
      fontWeight: "bold",
      color: "#A9A9A9",
    },
    "& .MuiInputBase-input": {
      fontWeight: "bold",
    },
  },
});

const CarRentalSearch = () => {
  const classes = useStyles();

  return (
    <Grid container xs={12} justify='space-between' alignItems='center'>
      <Grid container xs={5} className={classes.searchItemContainer}>
        <Grid item xs={6} className={classes.searchItem}>
          <TextField
            fullWidth
            label='Pick-up'
            InputProps={{ disableUnderline: true }}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={6} className={`${classes.searchItem} ${classes.right}`}>
          <TextField
            fullWidth
            label='Return'
            InputProps={{ disableUnderline: true }}
            className={classes.textField}
          />
        </Grid>
      </Grid>
      <Grid container xs={5} className={classes.searchItemContainer}>
        <Grid item xs={6} className={classes.searchItem}>
          <TextField
            fullWidth
            label='Pick-up date'
            InputProps={{ disableUnderline: true }}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={6} className={`${classes.searchItem} ${classes.right}`}>
          <TextField
            fullWidth
            color='primary'
            label='Return date'
            InputProps={{ disableUnderline: true }}
            className={classes.textField}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CarRentalSearch;
