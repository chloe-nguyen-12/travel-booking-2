import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  TextField,
  Grid,
  FormHelperText,
  Select,
  Button,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  Input,
  InputLabel,
  List,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import SignInModalFooter from "../MuiComponents/SignInModalFooter";
import SignInModalHeader from "../MuiComponents/SignInModalHeader";
import CloseModal from "../MuiComponents/CloseModal";
import axios from "axios";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import { useHistory } from "react-router-dom";
import { getCityName } from "../../utils/skyscanner";

const signUpStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    overflow: "hidden",
    width: "500px",
  },
  continueButton: {
    color: "white",
    fontSize: "16px",
    borderRadius: "6px",
    marginTop: "3rem",
    padding: "0.75rem 5rem 0.75rem 5rem",
  },
  sidePadding: {
    padding: "0rem 1rem 0rem 1rem",
  },
  locationPaper: {
    margin: "0.5rem 0 0.5rem 0",
  },
  locationText: {
    marginLeft: "1.25rem",
    fontWeight: "bold",
  },
  locationIcon: {
    paddingLeft: "0.75rem",
    color: `${theme.palette.secondary.main}`,
  },
  pr1: {
    paddingRight: "1rem",
  },

  mt2: {
    marginTop: "2rem",
  },
  signUpButton: {
    color: "white",
    fontSize: "16px",
    borderRadius: "6px",
    marginTop: "2.5rem",
    padding: "0.5rem, 1rem, 0.5rem, 1rem",
    width: "100%",
  },
  secondary: {
    color: `${theme.palette.secondary.main}`,
  },
  signUpErrText: {
    marginTop: "2rem",
    fontSize: "1rem",
  },
  list: {
    width: "100%",
    overflow: "auto",
    height: "200px",
    marginBottom: "20px",
  },
  select: {
    color: `${theme.palette.secondary.main}`,
  },
  page2: {
    width: "100%",
  },
}));

function SignUp(props) {
  const theme = useTheme();
  const classes = signUpStyles(theme);
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [signUpErr, setSignUpErr] = useState(false);
  const [home, setHome] = useState("");
  const [options, setOptions] = useState([]);
  const timeoutRef = useRef();

  const [page, setPage] = useState(true);
  const [locations, setLocations] = useState([]);
  const [favorites, setFavorites] = useState(["London", "Toronto"]);

  useEffect(() => {
    const getLocations = async () => {
      const response = await axios.get(
        "https://travel-booking-2.herokuapp.com/locations"
      );
      const locations = response.data.locations;
      setLocations(locations);
    };
    getLocations();
  }, []);

  const handleChange = (e) => {
    setFavorites(e.target.value);
  };

  const page1 = () => {
    return (
      <div>
        <Grid container item xs={12} justify="center" alignItems="center">
          <Grid item xs={8}>
            <Box mt={4.5}>
              {nameError ? (
                <TextField
                  error
                  id="filled-error-helper-text"
                  label="Name"
                  fullWidth={true}
                  helperText="Please put a name."
                  variant="outlined"
                  onChange={(e) => handleNameChange(e)}
                />
              ) : (
                <TextField
                  id="Name"
                  label="Name"
                  variant="outlined"
                  fullWidth={true}
                  color="secondary"
                  onChange={(e) => handleNameChange(e)}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box mt={2}>
              {emailValidationError ? (
                <TextField
                  error
                  id="filled-error-helper-text"
                  label="Email Address"
                  fullWidth={true}
                  helperText="Must be a valid email."
                  variant="outlined"
                  onChange={(e) => handleEmailChange(e)}
                />
              ) : (
                <TextField
                  id="Email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth={true}
                  color="secondary"
                  onChange={(e) => handleEmailChange(e)}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box mt={2}>
              {passwordLengthError ? (
                <TextField
                  error
                  id="filled-error-helper-text"
                  label="Password"
                  fullWidth={true}
                  helperText="Passwords must be greater than 6 characters."
                  variant="outlined"
                  type="password"
                  onChange={(e) => handlePasswordChange(e)}
                />
              ) : (
                <TextField
                  id="pass	"
                  label="Password"
                  variant="outlined"
                  fullWidth={true}
                  color="secondary"
                  type="password"
                  onChange={(e) => handlePasswordChange(e)}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box mt={2}>
              {passwordMatchError ? (
                <TextField
                  error
                  id="filled-error-helper-text"
                  label="Confirm Password"
                  fullWidth={true}
                  helperText="Passwords must match."
                  variant="outlined"
                  type="password"
                  onChange={(e) => handleConfirmPasswordChange(e)}
                />
              ) : (
                <TextField
                  id="Confirm-Password"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth={true}
                  color="secondary"
                  type="password"
                  onChange={(e) => handleConfirmPasswordChange(e)}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box mt={2}>
              <Autocomplete
                options={options}
                autoComplete
                autoHighlight
                groupLabel
                value={home}
                getOptionLabel={(option) => option}
                onChange={(_, newValue) => {
                  setHome(newValue);
                }}
                onInputChange={(_, newInputValue) => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  timeoutRef.current = setTimeout(async () => {
                    const response = await getCityName(newInputValue);
                    setOptions(response);
                  }, 500);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Home Airport"
                    variant="outlined"
                    color="secondary"
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>

        {/* BUTTON */}
        {signUpErr ? (
          <Grid item container justify="center" alignItems="center">
            <FormHelperText
              error
              children="Could not sign user up"
              className={classes.signUpErrText}
            ></FormHelperText>
          </Grid>
        ) : null}
        <Grid container justify="center" alignItems="center" item>
          <Grid item xs={4}>
            <Button
              color={"primary"}
              variant="contained"
              fullWidth={true}
              size="large"
              disableRipple={true}
              type="submit"
              className={classes.continueButton}
              onClick={handleFormSubmit}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  const page2 = () => {
    return (
      <div className={classes.page2}>
        <Grid container item xs={12} justify="center" alignItems="center">
          <Grid item xs={6}>
            <List className={classes.list}>
              {favorites.map((i, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    variant="outlined"
                    elevation={0}
                    className={classes.locationPaper}
                  >
                    <Grid container alignItems="center" justify="flex-start">
                      <Grid item xs={1}>
                        <RoomOutlinedIcon
                          className={classes.locationIcon}
                        ></RoomOutlinedIcon>
                      </Grid>
                      <Grid item xs={8}>
                        <p className={classes.locationText}>{i}</p>
                      </Grid>
                      <Grid
                        container
                        justify="flex-end"
                        item
                        xs={3}
                        className={classes.pr1}
                      >
                        <Button onClick={handleDelete(i)}>
                          <CloseModal
                            cb={handleExit}
                            modalContainer={false}
                          ></CloseModal>
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Grid item xs={4}>
            <FormControl fullWidth variant="filled">
              <InputLabel className={classes.select}>ADD MORE</InputLabel>
              <Select
                multiple
                value={favorites}
                onChange={handleChange}
                input={<Input />}
                renderValue={(_) => ""}
              >
                {locations.map((i) => (
                  <MenuItem
                    key={i._id}
                    value={i.location}
                    disabled={isDisabled(i.location)}
                  >
                    <Checkbox checked={favorites.indexOf(i.location) > -1} />
                    <ListItemText primary={i.location} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* BUTTON */}

        <Grid container justify="center" alignItems="center" item>
          <Grid item xs={5}>
            <Button
              color={"primary"}
              variant="contained"
              fullWidth={true}
              size="large"
              disableRipple={true}
              onClick={handleAddFavorites}
              className={classes.signUpButton}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  const handleExit = () => {};

  const handleNameChange = (e) => {
    setNameError(false);
    setName(e.target.value);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email.toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmailValidationError(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordLengthError(false);
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setPasswordMatchError(false);
    setConfirmPassword(e.target.value);
  };

  const handleDelete = (i) => () => {
    console.log("test", i);
    console.log(favorites.filter((el) => el !== i));
    setFavorites((state) => state.filter((el) => el !== i));
  };

  const isDisabled = (x) => {
    if (favorites.length >= 3 && !favorites.includes(x)) {
      return true;
    } else {
      return false;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError(true);
      return;
    }

    if (!validateEmail(email)) {
      setEmailValidationError(true);
      return;
    }
    if (password.length <= 6) {
      setPasswordLengthError(true);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    const userData = {
      name,
      email,
      password,
      home,
    };

    const sendSignUpRequest = async () => {
      try {
        const resp = await axios.post(
          "https://travel-booking-2.herokuapp.com/signup",
          userData
        );
        localStorage.setItem("loggedIn", "true");
        setPage(false);
      } catch (err) {
        setSignUpErr(true);
        return;
      }
    };
    sendSignUpRequest();
  };

  const handleAddFavorites = () => {
    const sendFavorites = async () => {
      console.log(favorites);
      const response = await axios.post(
        "https://travel-booking-2.herokuapp.com/favorites",
        { favorites }
      );
      history.push("/explore");
      props.exit();
    };
    sendFavorites();
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <CloseModal cb={props.exit} modalContainer={true}></CloseModal>
        <Grid container direction="column" justify="center" alignItems="center">
          {/* TOP TEXT - HEADER */}

          <SignInModalHeader
            title="Sign Up"
            subTitle="Please select your favourite travel destinations"
          ></SignInModalHeader>

          {/* FORM SECTION */}

          {page ? page1() : page2()}

          {/* FOOTER */}

          <SignInModalFooter
            primaryText={"Already have an account?"}
            secondaryText={"Sign In"}
            link={"/signin"}
          />
        </Grid>
      </Paper>
    </div>
  );
}

export default SignUp;
