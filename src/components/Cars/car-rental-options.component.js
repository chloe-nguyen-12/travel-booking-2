import React from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  searchItemContainer: {
    padding: "0 10px",
    marginTop: "20px",
  },
  searchItem: {
    textAlign: "left",
    padding: "5px",
  },
  select: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "25px",
    },
    switch: {
      color: "#2196f3",
    },
  },
});

const CarRentalOptions = (props) => {
  const classes = useStyles();
  const { carList } = props;

  return (
    <Grid container xs={12} justify='space-between' alignItems='center'>
      <Grid container xs={2} className={classes.searchItemContainer}>
        <Typography variant='h4'>
          <b>{carList ? carList.length : 0} Offers</b>
        </Typography>
      </Grid>
      <Grid
        container
        xs={7}
        justify='flex-end'
        alignItems='center'
        className={classes.searchItemContainer}>
        <Grid item xs className={classes.searchItem}>
          <FormControlLabel
            control={<Switch className={classes.switch} />}
            label={
              <Typography variant='subtitle1' color='textSecondary'>
                <b>Automatic Only</b>
              </Typography>
            }
            labelPlacement='start'
          />
        </Grid>
        <Grid item xs className={classes.searchItem}>
          <FormControl variant='outlined' className={classes.select}>
            <InputLabel>
              <Typography variant='subtitle2' color='textSecondary'>
                Vehicle Type
              </Typography>
            </InputLabel>
            <Select>
              <MenuItem>Car</MenuItem>
              <MenuItem>Car1</MenuItem>
              <MenuItem>Car2</MenuItem>
              <MenuItem>Car3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs className={classes.searchItem}>
          <FormControl variant='outlined' className={classes.select}>
            <InputLabel>
              <Typography variant='subtitle2' color='textSecondary'>
                Driver
              </Typography>
            </InputLabel>
            <Select>
              <MenuItem>18+</MenuItem>
              <MenuItem>25+</MenuItem>
              <MenuItem>35+</MenuItem>
              <MenuItem>50+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs className={classes.searchItem}>
          <FormControl variant='outlined' className={classes.select}>
            <InputLabel>
              <Typography variant='subtitle2' color='textSecondary'>
                Filter
              </Typography>
            </InputLabel>
            <Select>
              <MenuItem>Lowest Price First</MenuItem>
              <MenuItem>Highest Price First</MenuItem>
              <MenuItem>Hot</MenuItem>
              <MenuItem>Special</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CarRentalOptions;
