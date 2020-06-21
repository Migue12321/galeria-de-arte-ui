import React, { Component } from "react"
import Grid from "antd/lib/card/Grid"
import { Typography } from "antd"

import * as firebase from 'firebase'
import { Button } from 'antd'
import FileUpload from '../Components/Files/FileUpload'

export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            file:{},
            picture:{},
            uploadValue:0
        }
    }

    onChangefile(file){
        this.setState({file:file})
       
    }
    upload(){
        const storageRef = firebase.storage().ref(`pictures/${this.state.file.name}`)
        const task = storageRef.put(this.state.file)
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
            uploadValue: percentage
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            // Upload complete
            task.snapshot.ref.getDownloadURL().then((res) => {
                console.log(res)
                this.setState({
                    picture: res
                    })
            })
        })

    }
    
    render(){
        return(
            <>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Typography>Artista</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}> 
                        <FileUpload uploadValue ={this.state.uploadValue} picture={this.state.picture}
                                    onChangefile={this.onChangefile.bind(this)}></FileUpload>
    
                    </Grid>
                    <Grid item xs={12} sm={12}> 
                    <Button onClick={this.upload.bind(this)}>Subir imagen</Button>
                    </Grid>
    
                </Grid>
    
            </>
        )
    }
}

