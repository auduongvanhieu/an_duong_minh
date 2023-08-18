import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import { Box, Paper } from "@material-ui/core";
import videonotfound from "../icons/videonotfound.png";

const MissingVideo: React.FC = (props) => {
  return (
    <Box style={{background:'black'}} width={'100vw'} height={'100vh'} display={"flex"} justifyContent="center" alignContent={"center"} alignItems='center'>
      <Box style={{}} width={500} height={300}>
        <Paper style={{ width: "100%", height: "100%",background:'#272041',overflow:'hidden' }}>
          
        <img src={videonotfound} alt="" style={{width:'100%'}} />

        </Paper>
      </Box>
    </Box>
  );
};
export default withStyles(styles)(MissingVideo);
