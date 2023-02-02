import React, { useEffect, useState } from "react";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { AppBar, Typography, Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login/Login";
import UserPage from "./Pages/UserPage";

import { makeStyles } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import firebase from "./firebaseConfig";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#43A047",
    },
    secondary: {
      main: "#76d275  ",
    },
  },
  typography: {
    "font-family": `'Roboto Mono', "monospace"`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const classes = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export default function App() {
  const [,setEmail] = useState("");
  const [,setDisplayName] = useState("");
  const [, setEmailVerified] = useState("");
  const [, setPhotoURL] = useState("");
  const [, setIsAnonymous] = useState("");
  const [, setUid] = useState("");
  const [, setProviderData] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(false);
    authListener();
  }, []);

  const authListener = () => {
    let displayName,
      email,
      emailVerified,
      photoURL,
      isAnonymous,
      uid,
      providerData;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        sessionStorage.isAuthenticated = true;
        displayName = user.displayName;
        email = user.email;
        emailVerified = user.emailVerified;
        photoURL = user.photoURL;
        isAnonymous = user.isAnonymous;
        uid = user.uid;
        providerData = user.providerData;
      } else {
        sessionStorage.isAuthenticated = false;
        sessionStorage.role = "";
        displayName = "";
        email = "";
        emailVerified = "";
        photoURL = "";
        isAnonymous = "";
        uid = "";
        providerData = "";
      }
      setDisplayName(displayName);
      setEmail(email);
      setEmailVerified(emailVerified);
      setPhotoURL(photoURL);
      setIsAnonymous(isAnonymous);
      setUid(uid);
      setProviderData(providerData);
    });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLogged(false);

        sessionStorage.isAuthenticated = false;
        sessionStorage.Token = "";
        sessionStorage.role = "";
        sessionStorage.id = "";
      })
      .catch(function (error) {
        console.log("LogOut error:", error);
      });
  };

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <AppBar position="relative">
            <Toolbar>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <CameraIcon className={classes.icon} />
                <br />
                <br />
                <Typography variant="h6" color="inherit" noWrap>
                  Isa Condori
                </Typography>
              </Grid>

              {sessionStorage.getItem("role") &&
                sessionStorage.getItem("id") && (
                  <>
                    <Grid
                      container
                      direction="row-reverse"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <Button
                          color="secondary"
                          onClick={() => logout()}
                          disabled={isLogged}
                        >
                          Cerrar Sesion
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
            </Toolbar>
          </AppBar>
          <Switch>
            <PublicRoute exact path="/user/login" component={Login} />
            <PublicRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/admin/galeria" component={UserPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}
