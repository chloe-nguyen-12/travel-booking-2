import React from "react";
import FlightDetails from "../Flights/flight-details.component";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "25px",
  },
});

function SearchResults(props) {
  const classes = useStyles();
  const { state, setState } = props;
  const {
    Carriers: carriers,
    Places: places,
    Quotes: quotes,
  } = state.routeData;
  console.log(state.routeData);
  if (quotes.length < 1) {
    return (
      <div className={classes.root}>
        <Typography align="center" variant="h3">
          Sorry, there are no matching flights!
        </Typography>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Typography variant='h3' align='left'>
        <b> Best departing flights</b>
      </Typography>
      <Typography variant='subtitle1' align='left' color='textSecondary'>
        Total price includes tax + fees. Addtional bag fees and other fees may
        apply.
      </Typography>
      {quotes.map((quote) => (
        <FlightDetails
          quoteDetails={quote}
          places={places}
          carriers={carriers}
        />
      ))}
    </div>
  );
}

export default SearchResults;
