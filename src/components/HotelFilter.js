import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Container,
  Typography,
  Divider,
} from "@material-ui/core";
import MapContainer from "./Hotels/MapContainer";

const options = [
  {
    name: "breakfast",
    label: "Breakfast included",
  },
  { name: "all", label: "All-inclusive" },
  { name: "villa", label: "Villa" },
  { name: "view", label: "Ocean view" },
  { name: "hotel", label: "Hotel" },
];

const useStyles = makeStyles({
  root: { padding: "20px" },
  form: { padding: "30px 20px" },
  text: {
    color: "#c98ef5",
    textAlign: "center",
    textDecoration: "underline",
    margin: "30px",
  },
  label: {
    fontWeight: "600",
    marginBottom: "20px",
  },
  options: {
    color: "#c98ef5",
  },
});

const HotelFilter = () => {
  const [state, setState] = useState({
    breakfast: false,
    all: false,
    villa: false,
    view: false,
    hotel: false,
    resort: false,
  });
  const { breakfast, all, villa, view, hotel, resort } = state;

  const classes = useStyles();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };
  useEffect(() => {
    console.log(state);
  });

  return (
    <div className={classes.root}>
      <Container>
        <MapContainer />
        <Typography variant="subtitle1" className={classes.text}>
          {" "}
          View in a map
        </Typography>
      </Container>
      <Divider />
      <FormControl className={classes.form}>
        <FormLabel className={classes.label}>Filter by:</FormLabel>
        <FormGroup className={classes.options}>
          {options.map((option) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={state[option.name]}
                  onChange={handleChange}
                  name={option.name}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default HotelFilter;
