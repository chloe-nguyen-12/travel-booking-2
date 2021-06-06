import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles({
  dropBoxContainer: {
    padding: "10px",
    margin: "20px",
    textAlign: "center",
    border: "2px dotted",
  },
});

function DropBox() {
  const classes = useStyles();
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append("profile-picture", acceptedFiles[0]);
      return await axios({
        method: "post",
        url: "/profile/profile-picture",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  }, []);
  //Only allows one but will return empty array if multiple files dropped
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Grid item className={classes.dropBoxContainer} {...getRootProps()}>
      <input {...getInputProps()} />
      <InputLabel>
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </InputLabel>
    </Grid>
  );
}

export default DropBox;
