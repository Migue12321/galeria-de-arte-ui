import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'; 
import Link from '@material-ui/core/Link';
import InstagramIcon from '@material-ui/icons/Instagram';
import Copyright from '../Copyright/Copyright';
import Modal from '../Modal/ImageModal';
import ModalEdit from "../Modal/ModalEdit.js"
import { createMuiTheme,MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import EV from '../../EnviromentVariable';
import * as firebase from 'firebase';

const URL = EV.backend_API;
const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#43A047',
			},
			secondary: {
				main: '#FA465C',
			},
			
		},
		typography: {
			"font-family": `'Roboto Mono', "monospace"`,
			"fontWeightLight": 300,
			"fontWeightRegular": 400,
			"fontWeightMedium": 500   
		 
		}
	});
	
export default function Album(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [ImageUrl, setImageUrl] = useState("");
	const [title, setTitle] = useState("");
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const [imageId, setImageId] = useState("");
	const formInput= {
        marginTop: "0.5em",
        minWidth: 120,
    };
	const handleOpen  =(i) =>{
		setOpen(true);
		setImageUrl(props.paints[i].url);
		setTitle(props.paints[i].title);
		setHeight(props.paints[i].height)
		setWidth(props.paints[i].width);
		setImageId(props.paints[i]._id);
	}
	const handleChange = (i,e)=>{
		let text =e.target.value;
		if(i==="title")
			setTitle(text);
		if(i==="height"){
			console.log(text)
			if(validar_num(text)){
				setHeight(text);
			}
		}
		if(i==="width"){
			if(validar_num(text)){
				setWidth(text);
			}
		}
		
	}
	const validar_num =(num)=>{
		if(isNaN(num)){
			return false;
		}else{
			return true;
		}
	}
	const handleClose =() =>{
		setOpen(false);
		setOpenEdit(false)
	}	
	const handleOpenEdit  =(i) =>{
		setOpenEdit(true);
		setImageUrl(props.paints[i].url);
		setTitle(props.paints[i].title);
		setHeight(props.paints[i].height)
		setWidth(props.paints[i].width);
		setImageId(props.paints[i]._id);
	}
	
	const update = (id) =>{
		let form = {
			id: id,
			title: title,
			height:height,
			width: width,
			forSale: false,
			url: ImageUrl
		}
		form = JSON.stringify(form)
		let url = URL+"image/";
		fetch(url,{     
			method: 'PUT',
			body: form ,
			credentials: 'same-origin',
			headers: { 'Content-Type': 'application/json; charset=UTF-8'}  })
			.then(res => {
			if(res.status >=200 || res.status >400){
				window.location.reload();
				return true
			}else{
				alert("Error al guardar, intente de nuevo");
				console.log(res)
				return false
			}
			}).catch(error =>{
			console.log("Profile page error:",error.message);
			})
	}
	const deleteImage = (i)=>{
		let url = URL+"image/"+props.paints[i]._id;
		fetch(url,{     
			method: 'DELETE',
			credentials: 'same-origin',
			headers: { 'Content-Type': 'application/json; charset=UTF-8'}  })
			.then(res => {
			if(res.status >=200 || res.status >400){
				let imageRef = firebase.storage().refFromURL(`gs://galleria-de-arte.appspot.com/pictures/${title}`);
				imageRef.delete().then(function() {
					window.location.reload();
				}).catch(function(error) {
					console.log(error)
				});
				window.location.reload();

				return true
			}else{
				alert("Error al borrar, intente de nuevo");
				console.log(res)
				return false
			}
			}).catch(error =>{
				console.log("Profile page error:",error.message);
			})
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<MuiThemeProvider theme = { theme }>
			<main>
				<Container className={classes.cardGrid} maxWidth="lg">
					{/* End hero unit */}
					<Grid container spacing={4}> 
						{props.cards.map((card) => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image={props.paints[card].url}
										title={props.paints[card].title}
									/>
									<CardContent className={classes.cardContent}>
									<Typography variant="subtitle1">
											{props.paints[card].title}
										</Typography>
										<br/>
										<Typography variant="subtitle2" >
											{props.paints[card].height} X {props.paints[card].width}
										</Typography>
									</CardContent>
									<CardActions>
										<Grid container spacing={4}> 
											<Grid item xs sm>
												<Button size="small" color="primary" onClick={handleOpen.bind(this,card)}>
													Ver
												</Button>
											</Grid>
											<Grid item xs sm>
												<Button size="small"  color="primary" onClick={handleOpenEdit.bind(this,card)}>
													Editar
												</Button>
											</Grid>
											<Grid item xs sm>
												<Button size="small" color="secondary" onClick={deleteImage.bind(this,card)}>
													Eliminar
												</Button>
											</Grid>
										</Grid>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
				<Modal
					open ={open}
					handleClose = {handleClose}
					image= {ImageUrl}
					size = {height +" X "+ width}
					title = {title}
				></Modal>
				<ModalEdit
					open ={openEdit}
					handleClose = {handleClose}
					image= {ImageUrl}
					height = {height}
					width = {width}
					title = {title}
					id = {imageId}
					update = {update}
					handleChange ={handleChange}
					formInput ={formInput}
				></ModalEdit>
			</main>
			
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Sigueme en:
				</Typography>
				<Grid container justify="center">
					<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
						<Link color="inherit" href="https://www.instagram.com/isabela_0010/">
							<InstagramIcon fontSize="small"/> isabela_0010
						</Link>	
					</Typography>
				</Grid>
				<Copyright />
			</footer>
			{/* End footer */}
			</MuiThemeProvider>
		</React.Fragment>
	);
}