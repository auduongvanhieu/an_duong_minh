import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import { YouTubePlayer } from "react-youtube";
import { statePlayer } from "../../store/reduxs";
import { appContext } from "../../contexts/appContext";

export interface NavbarProps {
  status: statePlayer;
  isReady: boolean;
}

const TimeLine: React.FC<NavbarProps & WithStyles<typeof styles>> = (props) => {
  const {  status, classes, isReady } = props;
  const context = useContext(appContext);
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = useMemo(() => {
    return context.player?.getDuration ? context.player.getDuration() : 0;
  }, [context.player?.getDuration]);

  const handleSeekTo = (e) => {
    let width=e.target.offsetWidth
    let length=e.clientX-e.target.parentElement.offsetLeft+1
    const p=length/width*totalTime
    context.player.seekTo(p)
    setCurrentTime(p)
  };

  useEffect(() => {
    let timerId = setInterval(() => {
      if (status === statePlayer.playing) {
        setCurrentTime(context.player.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [status]);

  const percent = useMemo(() => {
    if (!totalTime) return 0;
    return (currentTime / totalTime) * 100;
  }, [currentTime, totalTime]);

  return (
    <Box className={classes.timeBar}>
      <Box className={classes.timeBarBackground}>
        <Box width={`${percent}%`} className={classes.timeBarBackgroundRun}></Box>
        <Box className={classes.timeBarClick} onClick={handleSeekTo}></Box>
      </Box>
    </Box>
  );
};
export default withStyles(styles)(TimeLine);
