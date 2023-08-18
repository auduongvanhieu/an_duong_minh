import React, { MouseEventHandler, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Slide,
  Typography,
} from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import Play from "../../icons/Play";
import PlayPause from "../../icons/PlayPause";
import Volumn from "../../icons/Volum";
import Expand from "../../icons/Expand";
import Square from "../../icons/Square";
import Pip from "../../icons/Pip";
import Cog from "../../icons/Cog";
import { YouTubePlayer } from "react-youtube";
import { statePlayer } from "../../store/reduxs";
import Pause from "../../icons/Pause";
import Timmer from "../Timmer";
import TimeLine from "../TimeLine";
import { useFullScreenHandle } from "react-full-screen";
import UnExpand from "../../icons/UnExpand";
import Mute from "../../icons/Mute";
import { appContext } from "../../contexts/appContext";
import Setting from "../../icons/Setting";
import Right from "../../icons/Right";
import Left from "../../icons/Left";
import Check from "../../icons/Check";
import QualitySelector from "../QualitySelector";

export interface NavbarProps {
  status: statePlayer;
  isReady: boolean;
  quality: string;
  isFull: boolean;
  isMute: boolean;
  mobile?: boolean;
  fullscreen;
}
// small
// medium
// large
// hd720
// hd1080
// highres
const ControlsOverlay = (props) => {
  const cogRef = useRef();
  const { status, classes, fullscreen, isFull, isMute, mobile, quality } = props;
  console.log(quality);
  const context = useContext(appContext);
  const [openSetting, setOpenSetting] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  const handlePlay = () => {
    if (status === statePlayer.playing) context.pauseVideo();
    else context.playVideo();
  };
  const dbClick = () => {
    isFull ? fullscreen.exit() : fullscreen.enter();
  };
  const handleOpenQualyty = () => {
    console.log("adsf");
    setOpenQuality(true);
  };

  const handleFullScreen = () => {
    fullscreen.enter();
  };
  const handleExitFullScreen = () => {
    fullscreen.exit();
  };
  const handleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };
  const [mouseEnc, setMouseEnc] = useState({ x: 0, y: 0 });
  const [hide, setHide] = useState(false);
  const handleMouseMove = (e: MouseEvent) => {
    // console.log(e.pageX,e.pageY);
    // console.log();
    setMouseEnc({ x: e.pageX, y: e.pageY });
  };
  useEffect(() => {
    setHide(false);
    let timeout = setTimeout(() => {
      setHide(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [mouseEnc]);

  useEffect(() => {
    if (status === statePlayer.playing) {
      if(!quality){
        let q=context.player.getPlaybackQuality()
      console.log(q);
      context.setQuality(q)
      }
    }
  }, [status]);

  return (
    <>
      {!mobile ? (
        <Box
          onMouseMove={(e) => handleMouseMove(e as any)}
          className={classes.wapper}
          width={"100%"}
          height={"100%"}
          display="flex"
          flexDirection={"column"}
        >
          <Box
            onDoubleClick={dbClick}
            onClick={handlePlay}
            flex={"auto"}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          ></Box>
          {!hide && <TimeLine />}
          {!hide && (
            <Box className={classes.controls}>
              <Box>
                {status !== statePlayer.playing && (
                  <Button onClick={handlePlay} className={classes.controlButton}>
                    <Play />
                  </Button>
                )}
                {status === statePlayer.playing && (
                  <Button onClick={handlePlay} className={classes.controlButton}>
                    <Pause />
                  </Button>
                )}
                {/* <Button onClick={handlePlay} className={classes.controlButton}>
            <PlayPause />
          </Button> */}
                <Button className={classes.controlButton} onClick={() => context.mute(!isMute)}>
                  {!isMute ? <Volumn /> : <Mute />}
                </Button>
                <Timmer />
              </Box>
              <Box>
                <Button onClick={handleOpenSetting} ref={cogRef} className={classes.controlButton}>
                  <Cog />
                </Button>
                <Popper
                  placement="top"
                  open={openSetting}
                  anchorEl={cogRef.current}
                  style={{ zIndex: 902 }}
                >
                  <Paper
                    style={{
                      padding: 8,
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      width: 270,
                      marginBottom: 50,
                      fontSize: 12,
                      position: "relative",
                    }}
                  >
                    {!openQuality && (
                      <List>
                        <ListItem onClick={handleOpenQualyty} button>
                          <ListItemIcon>
                            <Setting style={{ fill: "white" }} />
                          </ListItemIcon>
                          <ListItemText>Chất lượng</ListItemText>
                          <Typography variant="body2">
                            <Right />
                          </Typography>
                        </ListItem>
                      </List>
                    )}
                    {openQuality && (
                      <QualitySelector back={() => setOpenQuality(false)} selected={(a)=>context.qualityChange(a)} />
                    )}
                  </Paper>
                </Popper>
                {/* <Button className={classes.controlButton}>
            <Pip />
          </Button>
          <Button className={classes.controlButton}>
            <Square />
          </Button> */}
                {!isFull && (
                  <Button className={classes.controlButton} onClick={handleFullScreen}>
                    <Expand />
                  </Button>
                )}
                {isFull && (
                  <Button className={classes.controlButton} onClick={handleExitFullScreen}>
                    <UnExpand />
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          style={{
            background: "rgba(255,0,0,0.0)",
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 900,
            height: "max-content",
            width: "100%",
          }}
        >
          {<TimeLine />}
          {
            <Box style={{ paddingLeft: 0, paddingRight: 0 }} className={classes.controls}>
              <Box>
                {status !== statePlayer.playing && (
                  <Button size="small" onClick={handlePlay} className={classes.controlButtonMobile}>
                    <Play />
                  </Button>
                )}
                {status === statePlayer.playing && (
                  <Button size="small" onClick={handlePlay} className={classes.controlButtonMobile}>
                    <Pause />
                  </Button>
                )}
                <Button
                  size="small"
                  className={classes.controlButtonMobile}
                  onClick={() => context.mute(!isMute)}
                >
                  {!isMute ? <Volumn /> : <Mute />}
                </Button>
                <Timmer />
              </Box>
              <Box>
                {!isFull && (
                  <Button
                    size="small"
                    className={classes.controlButtonMobile}
                    onClick={handleFullScreen}
                  >
                    <Expand />
                  </Button>
                )}
                {isFull && (
                  <Button
                    size="small"
                    className={classes.controlButtonMobile}
                    onClick={handleExitFullScreen}
                  >
                    <UnExpand />
                  </Button>
                )}
              </Box>
            </Box>
          }
        </Box>
      )}
    </>
  );
};
export default withStyles(styles)(ControlsOverlay);
