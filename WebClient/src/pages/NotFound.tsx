import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import { Box, Paper } from "@material-ui/core";
import mainLogo from "../icons/notFound.jpg";
import App2 from "./App2";

const mapHostNameToSlug={
  "ozsun.vn":"cong-ty-co-phan-noi-that-an-duong-minh"
}

const NotFound: React.FC = (props) => {
  const [slug,setSlug]=useState()
  useEffect(()=>{
    const slugt=mapHostNameToSlug[document.location.host]
    if(slugt)setSlug(slugt)
  },[])
  if(slug)return <App2 slugHomepage={slug} />
  return (
    <Box style={{background:'black'}} width={'100vw'} height={'100vh'} display={"flex"} justifyContent="center" alignContent={"center"} alignItems='center'>
      <Box style={{}} width={500} height={300}>
        <Paper style={{ width: "100%", height: "100%",background:'#272041',overflow:'hidden' }}>
          <img src={mainLogo} alt="" style={{width:'100%'}} />

        </Paper>
      </Box>
    </Box>
  );
};
export default withStyles(styles)(NotFound);
