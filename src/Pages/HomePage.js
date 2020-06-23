import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import "./Login.css"
import Gallery from '../Components/Gallery/PublicGallery';

import EV from '../EnviromentVariable';
const URL = EV.backend_API;

export default class UserPage extends Component {
  constructor(props){
    super(props)
    this.state={
        paints:[{url:"", title:"",heigth:0, width:0, detail:""}],
        url:[],
        index:[0]
    }
  }

  getAllPaints(){
    let paints = [];
    let urls = [];
    let url = URL+'image/';
    fetch(url,{ method: 'GET', credentials: 'same-origin' ,
          headers: {
             "Access-Control-Allow-Origin": '*'
    }}).then(res => res.text())
    .then((res) => {
      
        let data = JSON.parse(res);
        let index=[]; 
        for(let i = 0; i<data.length; i++){
          paints.push(data[i]);
          index.push(i);
        }
        this.setState({
            paints:paints,
            url:urls,
            index:index
        });
        console.log(this.state)
    },
    (error) => {
      console.log(error);
    });
    }

  componentDidMount() {
    this.getAllPaints();
    console.log(this.state)
  }



  render(){
      return(
        <Container >
          <Gallery paints={this.state.paints} cards={this.state.index}></Gallery>
      </Container>
      )
  }

}
