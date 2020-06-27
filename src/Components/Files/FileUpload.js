import React, { Component } from 'react'
import {  Button} from "@material-ui/core";
import "./FileUpload.css"
export default class FileUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadValue: 0,
      file:"",
    }
    this.progressStyle = {
      backgroundColor: "#7ac342",
       borderRadius: "2px",
       width: "-webkit-fill-available"  
    }
  }
  
  handleOnChange (e) {
    const file = e.target.files[0];
    this.props.onChangefile(file);
  }
  
  render () {
    return (
      <div>
        <progress value={this.props.uploadValue} max='100'>
          {this.props.uploadValue} %
        </progress>
        <br />
        <Button
          style={this.formInput}
          color="secondary"
          variant="contained">
          <input type='file' color="secondary" onChange={this.handleOnChange.bind(this)}/>
       </Button>
      </div>
    )
  }
}
