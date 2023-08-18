import React, { useContext, useEffect, useMemo, useState } from "react";
import { Typography } from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import { YouTubePlayer } from "react-youtube";
import { statePlayer } from "../../store/reduxs";
import { appContext } from "../../contexts/appContext";

export interface NavbarProps {
  status: statePlayer;
}

const secondsToTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);

  let str = "";
  if (h) str += h < 10 ? `0${h}:` : `${h}:`;
  str += m < 10 ? `0${m}:` : `${m}:`;
  str += s < 10 ? `0${s}` : `${s}`;

  return str;
};

const Timmer: React.FC<NavbarProps & WithStyles<typeof styles>> = (props) => {
  const context = useContext(appContext);
  const {  status, classes } = props;
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = useMemo(() => {
    return context.player?.getDuration ? context.player.getDuration() : 0;
  }, [context.player?.getDuration]);

  useEffect(() => {
    let timerId = setInterval(() => {
      if (status === statePlayer.playing) {
        setCurrentTime(context.player.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [status]);

  return (
    <Typography display="inline" className={classes.controlText}>
      {secondsToTime(currentTime)} / {secondsToTime(totalTime)}
    </Typography>
  );
};
export default withStyles(styles)(Timmer);
