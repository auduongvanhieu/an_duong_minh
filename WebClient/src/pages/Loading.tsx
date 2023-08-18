import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import { Box, CircularProgress, Paper } from "@material-ui/core";
import mainLogo from "../icons/notFound.jpg";

const Loading: React.FC = (props) => {
  return (
    <Box style={{ background: "rgba(0,0,0,0.7)", position: "absolute", zIndex: 5000 }} width={"100vw"} height={"100vh"} display={"flex"} justifyContent="center" alignContent={"center"} alignItems="center">
      <CircularProgress size={130} color="secondary"/>
    </Box>
  );
};
export default withStyles(styles)(Loading);
