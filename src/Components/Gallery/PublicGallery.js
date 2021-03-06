import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'; 
import Link from '@material-ui/core/Link';
import Modal from '../Modal/ImageModal'
import InstagramIcon from '@material-ui/icons/Instagram';
import Copyright from '../Copyright/Copyright';
import Backdrop from '../Backdrop/Backdrop';

import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
  } from "react-share";
  import {
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
  } from "react-share";
  

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
	
export default function Album(props) {
	const urlLink = "https://isabela-watercolors.netlify.app/";
	const titleShare = "Isabela Watercolors web";
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [ImageUrl, setImageUrl] = useState("")
	const [title, setTitle] = useState("")
	const [size, setSize] = useState("")
	const handleOpen  =(i) =>{
		setOpen(true);
		setImageUrl(props.paints[i].url);
		setTitle(props.paints[i].title)
		setSize(props.paints[i].height+ "x"+props.paints[i].width)
	}
	const handleClose =() =>{
		setOpen(false);
	}
	
	return (
		<React.Fragment>
			<CssBaseline />
			<MuiThemeProvider theme = { theme }>
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							Isabela Watercolors
						</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
						</Typography>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}> 
					<Backdrop open = {props.loading}></Backdrop>
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
									<Button size="small" color="primary" onClick={handleOpen.bind(this,card)}>
										Ver
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
					{(props.paints.length === 0 && !props.loading) && 
					<Typography variant="h5" align="center" color="textSecondary" paragraph>
						No hay pinturas disponibles para mostrar, espera un poco más, estoy trabajando en ello.
					</Typography>
					}
					</Grid>
				</Container>
				<Modal open ={open}
								handleClose = {handleClose}
								image= {ImageUrl}
								size = {size}
								title = {title}
				></Modal>
			</main>
			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Sigueme en:
				</Typography>
				{/* <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
				</Typography>
			 */}
				<Grid container justify="center">
					<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
						<Link color="inherit" href="https://www.instagram.com/isabela_0010/">
							<InstagramIcon fontSize="small"/> isabela_0010
						</Link>	
					</Typography>
				</Grid>
			<Typography variant="body2" color="textSecondary" align="center"> 
				 Compartir: 
			</Typography>
			<FacebookShareButton
				url={urlLink}
				title={titleShare}
				className="Demo__some-network__share-button"
          	>
           		<FacebookIcon size={32} round />
          	</FacebookShareButton>
			<TwitterShareButton
				url={urlLink}
				title={titleShare}
				className="Demo__some-network__share-button"
			>
            	<TwitterIcon size={32} round />
         	</TwitterShareButton>
			<WhatsappShareButton
				url={urlLink}
				title={titleShare}
				separator=":: "
				className="Demo__some-network__share-button"
			>
				<WhatsappIcon size={32} round />
			</WhatsappShareButton>
			<Copyright />
			</footer>
			{/* End footer */}
			</MuiThemeProvider>
		</React.Fragment>
	);
}