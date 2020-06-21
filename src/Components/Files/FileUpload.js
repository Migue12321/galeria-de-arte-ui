import React, { Component } from 'react'

export default class FileUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadValue: 0,
      file:"",
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
        <input type='file' onChange={this.handleOnChange.bind(this)}/>
     
      </div>
    )
  }
}
