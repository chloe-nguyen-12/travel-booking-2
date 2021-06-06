import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import Avatar from "../Avatars/BigAvatar";
import ExploreCard from "../ExploreCard";
import "fontsource-roboto";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((themes) => {
  return {
    root: {
      maxWidth: "100%",
      overflowX: "auto",
    },
    grid: {
      width: "100%",
      margin: "0px",
      maxWidth: "100%",
      overflowX: "hidden",
    },
    leftQuadrant: {
      width: "30%",
      margin: "0px",
    },
    rightQuadrant: {
      width: "70%",
      margin: "0px",
      marginLeft: "30%",
      backgroundImage:
        "linear-gradient(to right, rgba(240,240,248,1), rgba(240,240,248,0));",
      position: "absolute",
      marginRight: "-30%",
    },
    avatar: {
      marginLeft: "41%",
    },
    container: {
      display: "grid",
      marginTop: "9%",
    },
    alignment: {
      alignContent: "center",
      textAlign: "center",
      margin: "auto",
    },
    logout: {
      position: "absolute",
      botton: "10px",
      alignContent: "center",
      textAlign: "center",
      margin: "auto",
    },
    misc: {
      marginRight: "20px",
      color: "#9A9DBA",
      position: "fixed",
      bottom: "10px",
      left: "13%",
    },
    h3: {
      marginLeft: "21%",
      marginTop: "4%",
    },
    exploreButton: {
      color: "black",
      marginTop: "8%",
    },
    FavouriteSpace: {
      marginTop: "10%",
    },
    buttongray: {
      color: "#808080",
    },
    email: {
      color: "#9EA1BC",
    },
  };
});

export default function UserPage() {
  const classes = useStyles();
  const [exploreCards, setExploreCards] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleExplore = () => {
    history.push("/explore");
  };
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    history.push("/signin");
  };
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get("/profile");
      console.log(user.data.favorites);
      setName(user.data.name);
      setEmail(user.data.email);
      setExploreCards(user.data.favorites);
    };
    getUser();
  }, []);
  const listOfExploreCards = exploreCards.map((exploreCard) => {
    return (
      <Grid item xs={5}>
        <ExploreCard
          imgName={exploreCard.imgName}
          location={exploreCard}
          alreadyLiked={true}
        ></ExploreCard>
      </Grid>
    );
  });

  return (
    <Grid container className={classes.grid}>
      <Grid container item spacing={1} className={classes.leftQuadrant}>
        <Grid item xs={12} className={classes.container}>
          <div className={classes.alignment}>
            <Avatar />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.alignment}>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography className={classes.email} gutterBottom>
            {email}
          </Typography>
        </Grid>
        <Grid item xs={12} />

        <Button
          variant="outlined"
          color="secondary"
          className={classes.alignment}
        >
          Edit
        </Button>

        <Grid item xs={12} className={classes.FavouriteSpace}>
          <Button fullWidth>Favourite Destinations</Button>
          <Button fullWidth className={classes.buttongray}>
            Notifications
          </Button>
          <Button fullWidth className={classes.buttongray}>
            Account Settings
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.misc}>
          <Button fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4} className={classes.rightQuadrant}>
        <Grid item xs={8}>
          <Typography className={classes.h3} variant="h4" gutterBottom>
            Favourite Destinations
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            size="large"
            className={classes.exploreButton}
            onClick={handleExplore}
          >
            Explore
          </Button>
        </Grid>
        <Grid container spacing={4} justify="center">
          {listOfExploreCards}
        </Grid>
      </Grid>
    </Grid>
  );
}
