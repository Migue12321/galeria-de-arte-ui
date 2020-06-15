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
import Modal from '../Components/Modal/ImageModal'

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center"> 
			{'Copyright © '}
			<Link color="inherit" href="https://www.instagram.com/isabela_0010/">
				Isabel Condori
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

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

const cards = [0,1, 2, 3, 4, 5, 6, 7, 8];
const titles =[
	"Totoro",
	"Jar of Universe",
	"World",
	"Cristals",
	"Escarbato",
	"Space collage",
	"Girasoles",
	"Dragon Rojo",
	"Stay inside"
]	
const sizes =[
	"15cm X 14cm",
	"15cm X 14cm",
	"15cm X 14cm",
	"15cm X 14cm",
	"15cm X 14cm",
	"15cm X 14cm",
	"15cm X 14cm",
	"15cm X 14cm",
	"15cm X 14cm",
]
const cardsUrl= [
	"https://scontent.fcbb1-1.fna.fbcdn.net/v/t1.0-9/s960x960/102683273_3658289037521269_5401877631665410758_o.jpg?_nc_cat=104&_nc_sid=8024bb&_nc_ohc=wD6pd4z2DxsAX8D7Du6&_nc_ht=scontent.fcbb1-1.fna&_nc_tp=7&oh=4e25593ddfe90a456b2a882fd8d829b3&oe=5F0A0A1F",
	"https://scontent.fcbb1-2.fna.fbcdn.net/v/t1.0-9/s960x960/100088919_3605113676172139_251365709777469440_o.jpg?_nc_cat=103&_nc_sid=8024bb&_nc_ohc=rOXc50p25BcAX-BA96c&_nc_ht=scontent.fcbb1-2.fna&_nc_tp=7&oh=9f6611e4f87e185e5f5b965dd6e26e5c&oe=5F0A8E15",
	"https://scontent.fcbb1-1.fna.fbcdn.net/v/t1.0-9/s960x960/98347090_3605113402838833_4721860957591044096_o.jpg?_nc_cat=109&_nc_sid=8024bb&_nc_ohc=pp6GpBH6t0MAX9f4SH_&_nc_ht=scontent.fcbb1-1.fna&_nc_tp=7&oh=c89495bb4b9c4c74713916810064b015&oe=5F0B1076",
	"https://scontent.fcbb1-2.fna.fbcdn.net/v/t1.0-9/s960x960/93930478_3526076647409176_5611111709772087296_o.jpg?_nc_cat=103&_nc_sid=8024bb&_nc_ohc=UCJUZC1u7BEAX-3et2j&_nc_ht=scontent.fcbb1-2.fna&_nc_tp=7&oh=ef335fa5e0cd24910e7828cbb9e210f7&oe=5F0C4C99",
	"https://scontent.fcbb1-2.fna.fbcdn.net/v/t1.0-9/p960x960/94134676_3519213204762187_2712618545774067712_o.jpg?_nc_cat=101&_nc_sid=8024bb&_nc_ohc=6iygTGH79MsAX-yiNxS&_nc_ht=scontent.fcbb1-2.fna&_nc_tp=6&oh=1e662a92529bc0a842123354df430699&oe=5F0A891F",
	"https://scontent.fcbb1-1.fna.fbcdn.net/v/t1.0-9/p960x960/93933287_3515789088437932_6143389033989931008_o.jpg?_nc_cat=109&_nc_sid=8024bb&_nc_ohc=2MNjJ91JAF8AX9xRGUC&_nc_ht=scontent.fcbb1-1.fna&_nc_tp=6&oh=2dcca21ee5439e73fc975a56b91efd0a&oe=5F0C70A2",
	"https://scontent.fcbb1-1.fna.fbcdn.net/v/t1.0-9/p851x315/92681739_3486435701373271_8949460450307735552_o.jpg?_nc_cat=108&_nc_sid=dd7718&_nc_ohc=ud2PcrdSB8IAX8DUBf4&_nc_ht=scontent.fcbb1-1.fna&_nc_tp=6&oh=e9a960c2bbb73e862a27a5b97fab32c2&oe=5F0AD127", 
	"https://scontent.fcbb1-2.fna.fbcdn.net/v/t1.0-9/88130368_3408788179138024_8676617481688711168_n.jpg?_nc_cat=103&_nc_sid=dd7718&_nc_ohc=X9IU4AtAMQ0AX9sV1-t&_nc_ht=scontent.fcbb1-2.fna&oh=80ca92e455ba82607f934b26776c7af0&oe=5F0A8B01",
	"https://scontent.fcbb1-1.fna.fbcdn.net/v/t1.0-9/p960x960/93793998_3504235392926635_4515139611789361152_o.jpg?_nc_cat=108&_nc_sid=dd7718&_nc_ohc=6yBHS_N-8BEAX_xK5OD&_nc_ht=scontent.fcbb1-1.fna&_nc_tp=6&oh=874127efd7bf217ac9e7bdc26840191e&oe=5F0B52E9"];
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
	
export default function Album() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [ImageUrl, setImageUrl] = useState("")
	const [title, setTitle] = useState("")
	const [size, setSize] = useState("")
	const handleOpen  =(i) =>{
		setOpen(true);
		setImageUrl(cardsUrl[i]);
		setTitle(titles[i])
		setSize(sizes[i])
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
							El Arte de Isa
						</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
							Aqui vendra informacion super cool sobre el arte de Isa y sobre ella, tambien informacion sobre los productos que llegue a vender :3
						</Typography>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}> 
						{cards.map((card) => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image={cardsUrl[card]}
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
									<Typography variant="subtitle1" >
											{titles[card]}
										</Typography>
										<br/>
										<Typography variant="subtitle2" >
											{sizes[card]}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary" onClick={handleOpen.bind(this,card)}>
											View
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
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
					Footer
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					Something here to give the footer a purpose!
				</Typography>
				<Copyright />
			</footer>
			{/* End footer */}
			</MuiThemeProvider>
		</React.Fragment>
	);
}