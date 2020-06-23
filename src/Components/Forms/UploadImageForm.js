import React, { Component } from "react"
import { Typography, Button, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import * as firebase from 'firebase';
import FileUpload from '../Files/FileUpload';
import EV from '../../EnviromentVariable';
const URL = EV.backend_API;
export default class UploadImageForm extends Component{
		constructor(props){
				super(props);
				this.state = {
						file:{},
						picture:{},
						uploadValue:0,
						paintData:{
							title:"",
							height:0,
							width:0,
							detail:""
						}
				} 
				this.formInput= {
					marginTop: "0.5em",
					minWidth: 120,
				};
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
				this.handleChange = this.handleChange.bind(this);
		}

		onChangefile(file){
				this.setState({file:file})
			 
		}
		upload(){
				const storageRef = firebase.storage().ref(`pictures/${this.state.paintData.title}`)
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
								this.saveImage()
						})
				})
		}

		saveImage(){
			let picture = this.state.picture;
			let paintData = this.state.paintData;
			paintData["url"] =picture;
			paintData["forSale"] =false;
			let headers ={
				method: 'POST',
				credentials: 'same-origin',
				body: JSON.stringify(paintData),
				headers: { 'Content-Type': 'application/json; charset=UTF-8'}
			};
			let url = URL+"image/";
			fetch(url,headers).then(res => {
				console.log(res)
				this.setState({
					paintData:{
						title:"",
						height:0,
						width:0,
						detail:""
					}
				});
				window.location.reload();
			}).catch(error => console.log(error));
			console.log(paintData)
		}
		handleChange = (event) => {
			const paintData = this.state.paintData;
			paintData[event.target.name] = event.target.value;
			this.setState({ paintData });
		}

		render(){
				return(
						<>
							<Container component="main" maxWidth="sm">
								<CssBaseline />
								<Grid container 
									justify="center">
										<Grid item xs={12} sm={12}>
												<Typography>Subir nueva Pintura</Typography>
										</Grid>
										<form
										>
											<Grid item xs={12} sm={12}> 
												<FileUpload 
													uploadValue ={this.state.uploadValue} 
													picture={this.state.picture}
													onChangefile={this.onChangefile.bind(this)}/>
							 				</Grid>
											<Grid item xs={12} sm={12}>
												<TextField
													variant="outlined"
													style={this.formInput}
													fullWidth
													label="Titulo"
													onChange={this.handleChange}
													name="title"
													type="text"
													value={this.state.paintData.title}
												/>
											</Grid>
										
											{/* <Grid item xs={12} sm={12}>
												<TextField
													variant="outlined"
													style={this.formInput}
													fullWidth
													className={'margin'}
													label="Detalle"
													onChange={this.handleChange}
													name="detail"
													type="textArea"
													value={this.state.paintData.detail}
												/>
											</Grid> */}
												<Grid container
												  direction="row"
													justify="center"
												>
												<Grid item xs={6} sm={6}>
												<TextField
													variant="outlined"
													style={this.formInput}
													label="Alto"
													onChange={this.handleChange}
													name="height"
													type="number"
													value={this.state.paintData.height}
												/>
											</Grid>
											<Grid item xs={6} sm={6}>
												<TextField
													variant="outlined"
													style={this.formInput}
													label="Ancho"
													onChange={this.handleChange}
													name="width"
													type="number"
													value={this.state.paintData.width}
												/>
											</Grid>
												</Grid>
											<Grid  item xs={12} sm={12}>
												<Button
													style={this.formInput}
													color="secondary"
													variant="contained"
													onClick={this.upload.bind(this)}
													className={this.classes.submit}
													>Subir imagen
												</Button>
										</Grid>
									</form>
								</Grid>
						  </Container>
						</>
				)
		}
}

