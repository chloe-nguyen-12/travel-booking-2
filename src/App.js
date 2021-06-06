import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/Navbar";
import UserPage from "./components/UserAccount/Userpage";
import SearchPage from "./pages/SearchPage";
import SignUp from "./components/UserAccount/SignUp";
import SignIn from "./components/UserAccount/SignIn";
import CarRental from "./pages/CarRentalPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ShoppingCartProvider } from "./components/ShoppingCart/ShoppingCartContext";
import HotelsPage from "./pages/HotelsPage";
import Stripe from "./components/Stripe";
import CheckoutPage from "./pages/CheckoutPage";
import ExplorePage from "./pages/ExplorePage";

const appStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "0",
    right: "0",
    bottom: "0",
    margin: "auto",
    backgroundColor: "rgba(0,0,0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navContainer: {
    width: "100%",
    height: "100%",
    opacity: "50%",
  },
}));

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const classes = appStyles(theme);

  useEffect(() => {
    const checkLoggedIn = () => {
      if (localStorage.loggedIn) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkLoggedIn();
  }, [loggedIn]);

  const handleModalExit = () => {
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ShoppingCartProvider>
          {loggedIn ? (
            <Navbar />
          ) : (
            <div className={classes.navContainer}>
              <Navbar />
            </div>
          )}
          <Switch>
            <Route exact path="/">
              <SearchPage />
              {loggedIn ? null : (
                <div className={classes.container}>
                  <SignIn exit={handleModalExit} />
                </div>
              )}
            </Route>

            <Route exact path="/signup">
              {loggedIn ? (
                <Redirect to="/explore" />
              ) : (
                <>
                  <SearchPage />
                  <div className={classes.container}>
                    <SignUp exit={handleModalExit} />
                  </div>
                </>
              )}
            </Route>
            <Route exact path="/signin">
              {loggedIn ? (
                <Redirect to="/explore" />
              ) : (
                <>
                  <SearchPage />
                  <div className={classes.container}>
                    <SignIn exit={handleModalExit} />
                  </div>
                </>
              )}
            </Route>
            <ProtectedRoute exact path="/carrental" component={CarRental} />
            <ProtectedRoute exact path="/userpage" component={UserPage} />
            <ProtectedRoute exact path="/explore" component={ExplorePage} />
            <ProtectedRoute exact path="/hotels" component={HotelsPage} />
            <ProtectedRoute exact path="/checkout" component={CheckoutPage} />
            <ProtectedRoute exact path="/stripe" component={Stripe} />
          </Switch>
        </ShoppingCartProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
