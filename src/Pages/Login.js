import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../Components/Copyright/Copyright'
import firebase from 'firebase';
import "./Login.css"
const EV = ""
const URL = EV.backend_API;
  

export default class Login extends Component {
  constructor(props){
    super(props)
    this.classes = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(3),
          backgroundColor: theme.palette.secondary,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
    this.state = {
      formData: {
        email: '',
        password: '',
      },
      isLogged:false
    };
    this.showPassword=false;
    this.open=false;
    this.formInput= {
            marginTop: "0.5em",
            minWidth: 120,
          };
    this.logo= {
      marginTop: "0.5em",
    };
  }

  login(formData){
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(()=>{
      this.setState({
        isLogged:true
      })
    }).then(()=>{
      let id= firebase.auth().currentUser.uid;
      sessionStorage.setItem("role","artista");
      sessionStorage.setItem("id",id);
      window.location = '/admin/galeria'
    })
    .catch(function(error) {
      var errorMessage = error.message;
      console.log("Login error:",error)
      alert(errorMessage)
    });

  }

  handleClose = () => {
    this.setState({open:false});
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleSubmit = () => {
    console.log("HEU")
    this.login(this.state.formData);
  }

  

 
  componentDidMount() {
      sessionStorage.clear();
    }



  render(){
      return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.classes.paper}>
          <br></br>
          <Avatar  className={"icon"}>
            <LockOutlinedIcon/>     
         </Avatar>  
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={this.classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value = {this.state.formData.email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange ={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value = {this.state.formData.password}
              onChange ={this.handleChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={this.classes.submit}
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      )
  }

}
