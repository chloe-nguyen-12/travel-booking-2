import React, { useContext } from "react";
import { Grid, Typography, Container, Button } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import { addToShoppingCart } from "../../utils/shoppingCart";
import { ShoppingCartContext } from "../ShoppingCart/ShoppingCartContext";

const useStyles = makeStyles({
  wrapper: {
    padding: "20px",
    background: "#fff",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  img: {
    borderRadius: "10px",
  },
  container: {
    padding: "0",
  },
  grid5: {
    paddingLeft: "10px",
  },
  grid3: {
    paddingBottom: "20px",
  },
  icon: {
    color: "#facd39",
  },
  location: {
    color: "#c98ef5",
    fontWeight: "400",
  },
  number: {
    color: "#c98ef5",
    fontWeight: "400",
  },
  nights: {
    color: "#c98ef5",
    fontWeight: "400",
  },
  button: {
    color: "white",
    marginTop: "1rem",
  },
  rating: {
    backgroundColor: "#4577ff",
    color: "#fff",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reviews: {
    paddingLeft: "5px",
  },
  content: {
    fontWeight: "500",
  },
  nights: {
    fontSize: "0.9rem",
  },
  noFound: {
    textAlign: "center",
    padding: "20px",
  },
});
const HotelList = ({ hotelList }) => {
  const classes = useStyles();

  const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

  const handleHotelSelection = (e, hotel) => {
    e.preventDefault();

    const hotelItem = {
      name: `${hotel.name}`,
      price: `${hotel.price}`,
      type: "hotel",
    };
    addToShoppingCart(shoppingCart, setShoppingCart, hotelItem);
  };

  if (hotelList.length === 0) {
    return (
      <Container className={classes.noFound}>
        <Typography variant='h4'> Sorry, No hotels found</Typography>
      </Container>
    );
  }
  return (
    <div className='root'>
      {hotelList.map((hotel) => (
        <Grid container className={classes.wrapper}>
          <Grid item xs={12} sm={4}>
            <Image
              src={hotel.image}
              cover
              aspectRatio={4 / 3}
              className={classes.img}
            />
          </Grid>
          <Grid
            container
            xs={12}
            sm={5}
            direction='column'
            justify='space-evenly'
            className={classes.grid5}>
            <Typography variant='h4'>{hotel.name}</Typography>
            <Container className={classes.container}>
              {[...new Array(5)].map((i) => (
                <StarIcon className={classes.icon} />
              ))}
            </Container>
            <Typography variant='h6' className={classes.location}>
              {hotel.location}
            </Typography>
            <Grid container>
              <Grid item sm={2} className={classes.rating}>
                {" "}
                {hotel.reviews.score}
              </Grid>
              <Grid item sm={10} className={classes.reviews}>
                <Typography display='block' className={classes.content}>
                  {hotel.reviews.review}
                </Typography>
                <Typography display='block' className={classes.number}>
                  {hotel.reviews.numberOfReviews} reviews
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            xs={12}
            sm={3}
            direction='column'
            justify='flex-end'
            alignItems='flex-end'
            className={classes.grid3}>
            <Grid item container alignItems='flex-end' direction='column'>
              <Typography variant='h3' display='block'>
                ${hotel.price}
              </Typography>
              <Typography variant='' display='block' className={classes.nights}>
                per night
              </Typography>
              <Button
                variant='contained'
                size='large'
                className={classes.button}
                onClick={(e) => handleHotelSelection(e, hotel)}
                color='primary'>
                Select Hotel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};
export default HotelList;
