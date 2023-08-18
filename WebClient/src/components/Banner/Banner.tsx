import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import { YouTubePlayer } from "react-youtube";
import { statePlayer } from "../../store/reduxs";
import { appContext } from "../../contexts/appContext";
import { Banner as BannerType } from "../../type";

export type PositionBanner = "left" | "right" | "bottom";
export interface NavbarProps {
  position: PositionBanner;
  isFullscreen: boolean;
  banner: BannerType;
}

const Banner: React.FC<NavbarProps & WithStyles<typeof styles>> = (props) => {
  const context = useContext(appContext);
  const { classes, isFullscreen, banner } = props;
  return (
    <>
      {!isFullscreen && banner && (
        <Box width="200px" style={{backgroundImage:`url(${banner.source})`}}>
          <Typography display="inline" className={classes.controlText}>
      {banner.name}
    </Typography>
        </Box>
      )}
    </>
  );
};
export default withStyles(styles)(Banner);
