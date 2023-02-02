import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import "../Pages/Login/Login";
import Gallery from "../Components/Gallery/PublicGallery";

export default function UserPage(props) {
  const [paints, setPaints] = useState([
    { url: "", title: "", heigth: 0, width: 0, detail: "" },
  ]);
  const [, setUrl] = useState([]);
  const [index, setIndex] = useState([0]);

  const getAllPaints = () => {
    let paints = [];
    let urls = [];
    let url = process.env.REACT_APP_BACKEND_API + "image/";
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.text())
      .then(
        (res) => {
          let data = JSON.parse(res);
          let index = [];
          for (let i = 0; i < data.length; i++) {
            paints.push(data[i]);
            index.push(i);
          }
          setPaints(paints);
          setUrl(urls);
          setIndex(index);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getAllPaints();
  }, []);

  return (
    <Container>
      <Gallery paints={paints} cards={index}></Gallery>
    </Container>
  );
}
