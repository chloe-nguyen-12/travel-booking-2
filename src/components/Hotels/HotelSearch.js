import React from "react";
import { Divider, Grid, Input } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: { margin: "30px 0" },
  item: {
    marginRight: "20px",
    padding: "0 20px;",
    border: "0.5px solid #e3e3ea",
    borderRadius: "5px",
  },
  input: { marginTop: "16px", fontSize: "0.8rem" },
  date: {
    fontSize: "0.8rem",
  },
});

const HotelSearch = () => {
  const classes = useStyles();
  const handleChange = () => {};
  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center">
          <Grid item xs={12} sm={3} className={classes.item}>
            <Input placeholder="Bali" fullWidth className={classes.input} />
          </Grid>
          <Grid item xs={12} sm={3} className={classes.item}>
            <Grid container justify="space-between">
              <Grid item xs={12} sm={5}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  className={classes.date}
                  value={new Date()}
                  minDate={new Date()}
                  onChange={handleChange}
                />
              </Grid>
              <Divider flexItem={true} />
              <Grid item xs={12} sm={5}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  className={classes.date}
                  value={new Date()}
                  minDate={new Date()}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.item}>
            <Input
              placeholder="1 room, 2 travellers"
              fullWidth
              className={classes.input}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default HotelSearch;
