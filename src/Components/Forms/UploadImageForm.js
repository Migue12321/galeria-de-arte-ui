import React, { useState } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import * as firebase from "firebase";
import FileUpload from "../Files/FileUpload";

const formInput = {
  marginTop: "0.5em",
  minWidth: 120,
};

const classes = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UploadImageForm() {
  const [file, setFile] = useState({});
  const [picture, setPicture] = useState({});
  const [uploadValue, setUploadValue] = useState(0);
  const [title, setTitle] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [detail, setDetail] = useState("");

  const onChangefile = (file) => {
    setFile(file);
  };

  const upload = () => {
    const storageRef = firebase
      .storage()
      .ref(`pictures/${title}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percentage);
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        // Upload complete
        task.snapshot.ref.getDownloadURL().then((res) => {
          setPicture(res);
          saveImage(res);
        });
      }
    );
  };

  const saveImage = (pictureUrl) => {
    let paintData = {
      'title': title,
      "height": height,
      "width": width,
      "detail": detail,
      "url": pictureUrl,
      "forSale": false,
    }
    let headers = {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(paintData),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    };
    let url = process.env.REACT_APP_BACKEND_API + "image/";
    fetch(url, headers)
      .then(() => {
        setTitle("");
        setHeight(0);
        setWidth(0);
        setDetail("");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Grid container justify="center">
          <Grid item xs={12} sm={12}>
            <Typography>Subir nueva Pintura</Typography>
          </Grid>
          <form>
            <Grid item xs={12} sm={12}>
              <FileUpload
                uploadValue={uploadValue}
                picture={picture}
                onChangefile={onChangefile}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                style={formInput}
                fullWidth
                label="Titulo"
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                type="text"
                value={title}
              />
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item xs={6} sm={6}>
                <TextField
                  variant="outlined"
                  style={formInput}
                  label="Alto"
                  onChange={(e) => setHeight(e.target.value)}
                  name="height"
                  type="number"
                  value={height}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  variant="outlined"
                  style={formInput}
                  label="Ancho"
                  onChange={(e) => setWidth(e.target.value)}
                  name="width"
                  type="number"
                  value={width}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                style={formInput}
                color="secondary"
                variant="contained"
                onClick={upload}
                className={classes.submit}
              >
                Subir imagen
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
