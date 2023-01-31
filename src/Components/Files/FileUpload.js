import React from "react";
import { Button } from "@material-ui/core";
import "./FileUpload.css";

export default function FileUpload(props) {
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    props.onChangefile(file);
  };

  return (
    <div>
      <progress value={props.uploadValue} max="100">
        {props.uploadValue} %
      </progress>
      <br />
      <Button color="secondary" variant="contained">
        <input type="file" color="secondary" onChange={handleOnChange} />
      </Button>
    </div>
  );
}