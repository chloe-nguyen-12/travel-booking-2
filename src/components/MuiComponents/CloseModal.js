import React from "react";
import { Box } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const closeModalStyles = makeStyles((theme) => ({
  closeXContainer: {
    position: "absolute",
    left: "93%",
    top: "2%",
    height: "20px",
    width: "20px",
    textAlign: "center",
  },
  closeX1: {
    height: "20px",
    width: "2px",
    marginLeft: "12px",
    backgroundColor: `${theme.palette.primary.light}`,
    transform: " rotate(45deg)",
    zIndex: "1",
  },
  closeX2: {
    height: "20px",
    width: "2px",
    backgroundColor: `${theme.palette.primary.light}`,
    transform: " rotate(90deg)",
    zIndex: "2",
  },
}));

function CloseModal(props) {
  const theme = useTheme();
  const classes = closeModalStyles(theme);

  return (
    <div>
      {props.modalContainer ? (
        <Box className={classes.closeXContainer}>
          <div className={classes.closeX1}>
            <div className={classes.closeX2}></div>
          </div>
        </Box>
      ) : (
        <div className={classes.closeX1}>
          <div className={classes.closeX2}></div>
        </div>
      )}
    </div>
  );
}

export default CloseModal;
