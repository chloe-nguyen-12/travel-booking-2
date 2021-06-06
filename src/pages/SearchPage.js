import React, { useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Search from "../components/Search/Search";
import SearchResults from "../components/Search/search-results.component";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "calc(100vh - 100px - 130px)",
    [theme.breakpoints.down("sm")]: {
      height: "60%",
    },
  },
  footer: {
    height: "130px",
    backgroundColor: "#EBF0F7",
  },
  item5: {
    margin: "auto auto",
    textAlign: "center",
    padding: "0 40px",
  },
  header: {
    fontWeight: "550",
    [theme.breakpoints.down("sm")]: {},
  },
  item7: {
    background: 'url("/images/searchHero.png") no-repeat center center/cover',
    [theme.breakpoints.down("sm")]: {
      height: "60%",
      position: "absolute",
      width: "100%",
      zIndex: "-1",
    },
    [theme.breakpoints.down("lg")]: {
      height: "110%",
      maxWidth: "inherit",
    },
  },
  searchContainer: {
    position: "absolute",
    bottom: "130px",
    [theme.breakpoints.down("sm")]: {
      position: "inherit",
      height: "60%",
      width: "100%",
    },
  },
  results: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    justify: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
  },
}));

const SearchPage = () => {
  const classes = useStyles();

  //Gets destination query param if redirected from explore page
  const params = new URLSearchParams(window.location.search);
  const destination = params.get("destination");

  const [state, setState] = useState({
    departureCity: "",
    arrivalCity: destination,
    departureDate: new Date(),
    arrivalDate: new Date(),
    numOfTravellers: 1,
    routeData: null,
  });

  return (
    <Grid container>
      <Grid container className={classes.main}>
        <Grid
          container
          item
          xs={12}
          sm={5}
          spacing={2}
          className={classes.item5}>
          <Grid item xs={12}>
            <Typography variant='h3' className={classes.header}>
              Find the flight and start the holiday
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} className={classes.searchContainer}>
          <Search state={state} setState={setState} />
        </Grid>
        <Grid item xs={12} sm={7} className={classes.item7}></Grid>
      </Grid>
      <Grid item md={12} className={classes.footer}></Grid>
      {state.routeData ? (
        <Container className={classes.results}>
          <SearchResults state={state} setState={setState} />
        </Container>
      ) : null}
    </Grid>
  );
};

export default SearchPage;
