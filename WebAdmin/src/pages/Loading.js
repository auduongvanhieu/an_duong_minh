import React, { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";

const Loading = (props) => {
  return (
    <Box
      style={{
        background: "rgba(0,0,0,0.7)",
        position: "absolute",
        zIndex: 5000,
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        
      }}
    >
      <CircularProgress {...props} color="secondary" />
    </Box>
  );
};
export default Loading;
