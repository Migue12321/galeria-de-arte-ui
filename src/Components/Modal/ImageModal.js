import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 3, 3),
    border: '2px solid #000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInfo:{
    width:"90%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 4),
    border: '0.5px solid #000',
  
  },

  image: {
    width:"90%",
    border: '0.5px solid #000',
    justifyItems:"center",
    borderRadius: "20px 20px 20px 20px",
  },  
  button:{
    marginLeft:"90%"
  }
   
}));


export default function TransitionsModal(props) {
  const classes = useStyles();

  return (
    <div> 

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
        <div  className={classes.paper}>
          <Grid  
              container
              direction="row"
              justify="space-between"
              alignItems="center"
          >
            <Grid  item md={6} sm={6} lg={6} xs={12}> 
              <img className={classes.image} src={props.image} alt={props.title}></img>
            </Grid> <Grid item />
            <Grid item md={6} sm={6} lg={6} xs={12}>
              <div  className={classes.imageInfo}>  
                <Typography variant="h4" component="h2">{props.title}</Typography>
                <br/>
                <Typography variant="subtitle2">Medidas: {props.size}</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        </Fade>
      </Modal>  
    </div>
  );
}
