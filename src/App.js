import React, { Component } from 'react';
import './App.css';
import { createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import { AppBar, Typography, Grid } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import Button from '@material-ui/core/Button';


import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import UserPage from './Pages/UserPage';

import { makeStyles } from '@material-ui/core/styles';
// Route, Link,
import {BrowserRouter as Router,  Switch} from 'react-router-dom'
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import firebase from './firebaseConfig';

const theme = createMuiTheme({
  palette: { 
    primary: { 
        main: '#43A047',
    },
    secondary: {
      main: '#76d275  ',
  }
  },
  typography: {
    "font-family": `'Roboto Mono', "monospace"`,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500   
   
  }
});

class App extends Component{
  constructor () {
    super();
    this.state = { 
      name: "",
      email: "",
      password: "",
      displayName: "",
      emailVerified: "",
      photoURL: "",
      isAnonymous : "",
      uid : "",
      providerData: "",
      isLogged: false
    }
    this.classes =  makeStyles((theme) => ({
      icon: {
        marginRight: theme.spacing(2),
      }, 
      }))

  }
  componentDidMount(){
    this.setState({
      isLogged:false
    });
    this.authListener = this.authListener.bind(this);
    this.authListener();
  }
  componentWillUnmount(){

  }
  authListener(){
    let displayName,email, emailVerified,photoURL, isAnonymous, uid, providerData;
    const context =this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        sessionStorage.isAuthenticated=true;
        displayName = user.displayName;
        email = user.email;
        emailVerified = user.emailVerified;
        photoURL = user.photoURL;
        isAnonymous = user.isAnonymous;
        uid = user.uid;
        providerData =user.providerData;
      } else {
        sessionStorage.isAuthenticated =false;
        sessionStorage.role ="";
         displayName = ""
         email = ""
         emailVerified = ""
         photoURL = ""
         isAnonymous = ""
         uid = ""
         providerData =""

      }
      context.setState({
        displayName :displayName,
        email : email,
        emailVerified :emailVerified,
        photoURL : photoURL,
        isAnonymous : isAnonymous,
        uid : uid,
        providerData : providerData

      })
      
    });
   
  }
  
  logout(){
    firebase.auth().signOut().then(() =>{
      this.setState({
        isLogged:false
      })
      sessionStorage.isAuthenticated=false;
      sessionStorage.Token="";
      sessionStorage.role="";
      sessionStorage.id="";
      
    }).catch(function(error) {
      console.log("LogOut error:",error)
    });
  }

 
  
  render (){
    return (
      <div className="App">
        <MuiThemeProvider theme = { theme }>
        <Router >
        <AppBar position="relative">
          <Toolbar>
          <Grid container
           direction="row"
           justify="flex-start"
           alignItems="center"
          >
            <ColorLensIcon className = {this.classes.icon} />
            <br/>
            <br/>
            <Typography variant="h6" color="inherit" noWrap>
              Isa Condori	
            </Typography> 
            </Grid>
           
            {
              (sessionStorage.getItem("role")  && sessionStorage.getItem("id"))  &&<> 
               <Grid container
                direction="row-reverse"
                justify="flex-start"
                alignItems="center"
                >
                <Grid item  >
                      <Button color="secondary" onClick={() => this.logout()} disabled={this.state.isLogged} >Cerrar Sesion</Button>
                </Grid>
               </Grid>
              </>
            }

          </Toolbar>
        </AppBar>
        <Switch>
          <PublicRoute exact path="/user/login" component={Login}/>
          <PublicRoute exact path="/" component={HomePage}/>
          <PrivateRoute exact path="/admin/galeria" component={UserPage}/>
        </Switch>
        </Router>

        </MuiThemeProvider>
      </div>
    );
  };
}
export default App

