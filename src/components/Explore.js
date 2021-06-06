import React, { useEffect, useState } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import ExploreCard from "./ExploreCard";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { returnArrayRandom } from "../utils/utilFunctions";

const exploreStyles = makeStyles((theme) => ({
  pageContainer: {
    overflow: "hidden",
    marginBottom: "3rem",
  },
  pt4: {
    paddingTop: "3rem",
  },
  loading: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    minHeight: "40rem",
    [theme.breakpoints.down("sm")]: { minHeight: "23rem" },
  },

  textAlign: {
    textAlign: "center",
  },
  cardContainer: {
    paddingTop: "2rem",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  headerSpacing: {
    margin: "2rem 0 1rem 0",
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: "2rem",
  },
  button: theme.buttonPrimary,
}));

function Explore(props) {
  //To get image for exploreCard, make sure the image is saved in public with the name of the place. ex: "public/images/cancun.png"
  //THIS: props.location.toLowerCase() === saved image name

  const { allLocations } = props;
  const theme = useTheme();
  const classes = exploreStyles(theme);
  const [state, setState] = useState({
    locations: [],
    favorites: [],
  });

  const shuffleLocations = async () => {
    const favoriteData = await axios.get(
      "https://travel-booking-2.herokuapp.com/favorites/getAllFavorites"
    );
    const favoritesArray = favoriteData.data;
    let filteredLocations = allLocations;
    if (favoritesArray.length > 0) {
      filteredLocations = allLocations.filter(
        (location) =>
          favoritesArray.findIndex(
            (fav) => fav.location === location.location
          ) < 0
      );
    }
    const randomLocations = returnArrayRandom(
      filteredLocations,
      8 - favoritesArray.length
    );
    favoritesArray.forEach((e) => (e.liked = true));

    setState({
      locations: [...favoritesArray, ...randomLocations],
      favorites: favoritesArray,
    });
  };
  useEffect(() => {
    shuffleLocations();
  }, [allLocations]);

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        className={classes.pageContainer}
      >
        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
          className={classes.pt4}
        >
          <Grid item xs={12} container justify="center" alignItems="center">
            <Typography variant="h2" className={classes.textAlign}>
              Explore Destinations
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.headerSpacing}>
            World's Top Destinations to Explore
          </Typography>
        </Grid>
        <Grid
          container
          item
          justify="center"
          alignItems="center"
          spacing={5}
          className={classes.cardContainer}
        >
          <Grid
            container
            alignItems="center"
            justify="center"
            className={classes.buttonContainer}
          >
            <Button
              variant="contained"
              size="large"
              className={classes.button}
              onClick={() => shuffleLocations()}
            >
              Shuffle <ShuffleIcon />
            </Button>
          </Grid>
          {state.locations.length > 0 ? (
            state.locations.map((loc) => {
              return (
                <Grid item xs={12} md={6} xl={3} key={loc.id}>
                  <ExploreCard
                    location={loc}
                    imgName={loc.imgName}
                    alreadyLiked={loc.liked ? true : false}
                  ></ExploreCard>
                </Grid>
              );
            })
          ) : (
            <div className={classes.loading}>
              <CircularProgress
                className={classes.loadingCircle}
                size="100px"
              />
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Explore;
