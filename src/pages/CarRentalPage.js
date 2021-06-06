import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CarRentalSearch from "../components/Cars/car-rental-search.component";
import CarRentalOptions from "../components/Cars/car-rental-options.component";
import CarCard from "../components/Cars/car-card.component";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "auto",
    marginTop: "100px",
  },
  carCardContainer: {
    marginTop: "100px",
  },
});

const CarRentalPage = () => {
  const classes = useStyles();
  const [carList, setCarList] = useState();
  useEffect(() => {
    const getCarList = async () => {
      const response = await axios.get("/carRental");
      setCarList(response.data.carList);
    };
    getCarList();
  }, []);
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      xs={8}
      className={classes.root}>
      <CarRentalSearch />
      <CarRentalOptions carList={carList} />
      <Grid
        container
        spacing={8}
        justify='space-between'
        alignItems='center'
        className={classes.carCardContainer}>
        {carList ? carList.map((car) => <CarCard car={car} />) : null}
      </Grid>
    </Grid>
  );
};

export default CarRentalPage;
