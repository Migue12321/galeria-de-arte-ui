import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { TextField, Grid, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 3, 3),
    border: "2px solid #000",
    justifyContent: "center",
    alignItems: "center",
  },
  imageInfo: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 4),
    border: "0.5px solid #000",
  },

  image: {
    width: "95%",
    border: "0.5px solid #000",
    justifyItems: "center",
    borderRadius: "20px 20px 20px 20px",
  },

  button: {
    marginLeft: "90%",
  },
}));

export default function EditModal(props) {
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
          <div className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item md={6} sm={6} lg={6} xs={12}>
                <img
                  className={classes.image}
                  src={props.image}
                  alt={props.title}
                ></img>
              </Grid>{" "}
              <Grid item />
              <form>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h3" component="h2">
                    Título:
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {props.title}
                  </Typography>
                  <br />
                </Grid>
                <Grid container direction="row" justify="center">
                  <Grid item xs={6} sm={6}>
                    <TextField
                      variant="outlined"
                      style={props.formInput}
                      label="Alto"
                      onChange={props.handleChange.bind(this, "height")}
                      name="height"
                      type="number"
                      value={props.height}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      variant="outlined"
                      label="Ancho"
                      onChange={props.handleChange.bind(this, "width")}
                      name="width"
                      type="number"
                      style={props.formInput}
                      value={props.width}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    fullWidth
                    style={props.formInput}
                    color="primary"
                    variant="contained"
                    onClick={props.update.bind(this, props.id)}
                  >
                    Editar Datos de la Imagen
                  </Button>
                </Grid>
              </form>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
