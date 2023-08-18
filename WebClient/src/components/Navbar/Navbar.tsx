import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Slide, Typography } from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import Down from "../../icons/Down";
import Up from "../../icons/Up";
import classNames from "classnames";
import { GetVideoResult, Settings, VideoPart } from "../../type";
import Left from "../../icons/Left";
import Right from "../../icons/Right";
import { YouTubePlayer } from "react-youtube";
import { statePlayer } from "../../store/reduxs";
import { appContext } from "../../contexts/appContext";

export interface NavbarProps {
  open?: boolean;
  handleNavbar: (a: boolean) => void;
  handleVideoYoutubeId: (a: string) => void;
  handleSeconds: (a: number) => void;
  handleTriggerPlay: () => void;
  videoYoutubeId: string;
  state: statePlayer;
  currentPart: VideoPart;
  settings: Settings;
}

const Navbar: React.FC<NavbarProps & WithStyles<typeof styles>> = ({
  handleTriggerPlay,
  open,
  currentPart,
  handleNavbar,
  classes,
  handleVideoYoutubeId,
  videoYoutubeId,
  state,
  handleSeconds,
  settings,
}) => {
  //console.log(info);
  const context = useContext(appContext);
  const middleBox = useRef<HTMLDivElement>(null);
  const middleContentBox = useRef<HTMLDivElement>(null);
  const [isShowScrollbar, setIsShowScrollbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenPart = (part: VideoPart) => {
    console.log(part)
    context.handleCurrentPart(part);
    handleVideoYoutubeId(part.videoYoutubeId);
    if (part.type === "part") {
      handleSeconds(part.startSeconds || 0);
    } else if (part.type === "video") {
      handleSeconds(part.startSeconds || 0);
    }
    //handleTriggerPlay()
    //   setIsLoading(true)
    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 2000);
  };
  useEffect(() => {
    if (isShowScrollbar) {
      console.log("CHANGE PART NEED SET POSSITION");
      let ii =
        (middleContentBox.current.offsetWidth / context.info.data.parts.length) *
        context.info.data.parts.findIndex((f) => f === currentPart);
      middleBox.current.scrollTo(ii - 150, 0);
    }
  }, [currentPart]);

  useEffect(() => {
    function scroll(e: WheelEvent) {
      console.log(e.deltaY);
      middleBox.current.scrollTo(middleBox.current.scrollLeft + e.deltaY / 2, 0);
    }
    middleBox.current?.addEventListener("wheel", scroll, false);
    return () => middleBox.current?.removeEventListener("wheel", scroll, false);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      let check = middleBox.current.scrollWidth == middleContentBox.current.scrollWidth;
      setIsShowScrollbar(check);
    };
    window.addEventListener("resize", handleResize, false);
    setTimeout(() => {
      handleResize();
    }, 300);

    return () => window.removeEventListener("resize", handleResize, false);
  }, []);
  const scrollStep = 150;
  const handleScrollLeft = (x: number) => {
    middleBox.current.scrollTo(middleBox.current.scrollLeft + x, 0);
  };

  return (
    <Box className={classes.container}>
      <Box className={classNames(classes.mainBox, { [classes.open]: open })} style={{ background: context?.info?.data?.column8 ?? "#47daff46" }}>
        <Box className={classes.contentBox}>
          {/* {isShowScrollbar && (
            <Box>
              <Button
                onClick={() => handleScrollLeft(-scrollStep)} 
                className={classes.buttonScroll}
              >
                <Left />
              </Button>
            </Box>
          )} */}
          <div ref={middleBox} className={classes.middleBox}>
            <div
              ref={middleContentBox}
              style={{ width: "max-content", height: "100%", overflow: "hidden" }}
            >
              {context?.info?.data?.parts?.map((part, index) => {
                return (
                  <Box
                    onClick={() => handleOpenPart(part)}
                    key={index}
                    className={classNames(classes.itemBox,  {
                      [classes.active]: currentPart === part,
                      [classes.disabledbutton]:isLoading
                    })}
                    style={{ backgroundImage: `url("${part.thumbnail}")` }}
                  >
                    <Typography style={{
                      color: context.info?.data?.column3 || 'white',
                      backgroundColor: context.info?.data?.column4 || 'rgba(0,109,192,0.52)'
                    }} display="inline" className={classes.titleText}>
                      {part.title}
                    </Typography>
                  </Box>
                );
              })}
            </div>
          </div>
          {/* {isShowScrollbar && ( 
            <Box>
              <Button className={classes.buttonScroll}>
                <Right onClick={() => handleScrollLeft(scrollStep)} />
              </Button>
            </Box>
          )} */}
        </Box>
      </Box>
      <Box display={"flex"} alignContent="center" justifyContent={"center"}>
        <Button style={{ color: context.info?.data?.column5 || "#01A0C6", backgroundColor: context.info?.data?.column6 || 'rgba(255,255,255,0.1)', marginTop: 7 }} onClick={() => handleNavbar(!open)}>
          {
            (!open &&context?.info?.data?.column1) &&
              <Typography style={{ marginRight: 15 }} display="inline">
                {context?.info?.data?.column1}
              </Typography>
            }
            {
            (open &&context?.info?.data?.column2) &&
              <Typography style={{ marginRight: 15 }} display="inline">
                {context?.info?.data?.column2}
              </Typography>
            }
          {!open && <Down />}
          {open && <Up />}
        </Button>
      </Box>
    </Box>
  );
};
export default withStyles(styles)(Navbar);
