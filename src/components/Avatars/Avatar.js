import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ImageAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="Alex"
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2ee38b4e-1ad8-433e-b83b-5f1492547b2d/d3a4k16-486f7e33-afd1-4d1d-a573-ff3d9ea74e8f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmVlMzhiNGUtMWFkOC00MzNlLWI4M2ItNWYxNDkyNTQ3YjJkXC9kM2E0azE2LTQ4NmY3ZTMzLWFmZDEtNGQxZC1hNTczLWZmM2Q5ZWE3NGU4Zi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.g16PZQ0d4y8s6zV_SIhLryhy9X6UXCC0ZMN0mIW35Uk"
        onClick={() => {
          alert("Working on it");
        }}
      />
    </div>
  );
}
