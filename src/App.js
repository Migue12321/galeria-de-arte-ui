import React from 'react';
import './App.css';
import { createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import HomePage from './Pages/HomePage'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Route, Link,
import {BrowserRouter as Router,  Switch} from 'react-router-dom'
// import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
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
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  }, 
  }
));
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <MuiThemeProvider theme = { theme }>
      <Router >
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className = {classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Isa Condori
          </Typography> 
        </Toolbar>
      </AppBar>
      <Switch>
        <PublicRoute exact path="/" component={HomePage}/>
      </Switch>
      </Router>

      </MuiThemeProvider>
    </div>
  );
}

export default App;
