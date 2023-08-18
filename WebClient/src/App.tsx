import { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import "./App.css";
import ControlsOverlay from "./components/ControlsOverlay";
import Navbar from "./components/Navbar";
import { Banner, GetVideoResult, Settings, VideoPart } from "./type";
import { State, statePlayer } from "./store/reduxs";
import { Box, Button } from "@material-ui/core";
import { useSearchParams } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Loading from "./pages/Loading";
import { getInfo, getSetting } from "./api";
import MissingVideo from "./pages/MissingVideo";
import { appContext, IPlayer } from "./contexts/appContext";
import BannerComponent from "./components/Banner";
import Play from "./icons/Play";
import { BrowserView, MobileView, isMobile } from "react-device-detect";

interface AppProps {
  handleStateChange: (a: number) => void;
  status?: statePlayer;
  handleNavbar: (a: boolean) => void;
  handleReady: (a: boolean) => void;
  handleFull: (a: boolean) => void;
  handleLoading: (a: boolean) => void;
  handleVideoYoutubeId: (a: string) => void;
  handleSeconds: (a: number) => void;
  handleTriggerPlay: () => void;
  handleMute: (a: boolean) => void;
  setBanner: (a: "setBannerLeft" | "setBannerRight" | "setBannerBottom", f: Banner) => void;
  handleCurrentPart: (a: VideoPart) => void;
  setSetting: (a: Settings) => void;
  handleQualityChange: (a: string) => void;
  open?: boolean;
  isLoading?: boolean;
  isFullscreen?: boolean;
  isReady?: boolean;
  videoYoutubeId?: string;
  seconds?: number;
  triggerPlay?: number;
  currentPart?: VideoPart;
  bannerLeft?: Banner;
  bannerRight?: Banner;
  bannerBottom?: Banner;
}

const App: React.FC<AppProps> = ({
  handleSeconds,
  handleMute,
  handleCurrentPart,
  isFullscreen,
  currentPart,
  triggerPlay,
  handleTriggerPlay,
  handleStateChange,
  status,
  handleFull,
  isLoading,
  handleLoading,
  isReady,
  handleVideoYoutubeId,
  videoYoutubeId,
  seconds,
  setSetting,
  bannerLeft,
  bannerRight,
  bannerBottom,
  handleQualityChange
}) => {
  //console.log(window.location.host)
  //?jdsfhoisdjfk#/video?slug=cong-ty-co-phan-noi-that-an-duong-minh

  const screen = useFullScreenHandle();
  const [player, setPlayer] = useState<YouTubePlayer>({});
  const [info, setInfo] = useState<GetVideoResult>();

  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");

  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen) {
        handleFull(state);
      }
    },
    [screen]
  );

  const onReady = (e: YouTubeEvent) => {
    //console.log("READY CALL");
    console.log(e);
    setPlayer(() => e.target);
    setTimeout(() => {
      handleTriggerPlay();
    }, 2500);
  };

  const onStateChange = (gg: YouTubeEvent) => {
    // console.log("CHANGE STATE CALL");
    let data = gg.data;
    //console.log('state change: ',data);
    handleStateChange(data);
  };

  const onPlaybackQualityChange = (gg: YouTubeEvent) => {
    // console.log("CHANGE STATE CALL");
    let data = gg.data;
    console.log('onPlaybackQualityChange: ',data);
    handleQualityChange(data);
  };

  const onEnd = () => {
    //console.log("END OF VIDEO ", gg);
    nextPart();
  };

  useEffect(() => {
    if (slug?.trim()) {
      getInfo(slug).then((data) => {
        handleLoading(false);
        let videoId = data.data.parts[0].value;
        for (let part of data.data.parts) {
          if (part.type === "part") {
            part.videoYoutubeId = videoId;
          } else if (part.type === "video") {
            videoId = part.value;
            part.videoYoutubeId = videoId;
          }
        }
        setInfo(data);
        handleVideoYoutubeId(data.data.parts[0].videoYoutubeId);
        handleCurrentPart(data.data.parts[0]);
        handleSeconds(data.data.parts[0].startSeconds);
        //setBanner("setBannerBottom", data.data.banners[0]);
        //setBanner("setBannerLeft", data.data.banners[1]);
        //setBanner("setBannerRight", data.data.banners[2]);
        console.log(data);
      });
    }
    getSetting().then((data) => {
      setSetting(data);
    });
  }, []);

  //console.log(isReady);
  useEffect(() => {
    resize();
    console.log(isReady, player, seconds);
    if (isReady) {
      //console.log("READY HANDLE", seconds);
      player.playVideo();
      player.seekTo(seconds);
      setTimeout(() => {
        let a = player.getPlayerState();
        console.log(a);
        if (a !== 1) player.playVideo();
      }, 1000);
    }
  }, [triggerPlay]);

  function mute(a) {
    a && player.mute();
    !a && player.unMute();
    handleMute(a);
  }

  function pauseVideo() {
    player.pauseVideo();
  }

  function playVideo() {
    player.playVideo();
  }

  function seekTo(number) {
    player.seekTo(number);
  }

  function stopVideo() {
    player.stopVideo();
  }

  function qualityChange(a:string) {
    console.log('HANDLE CHANGE QUALITY')
    pauseVideo()
    player.setPlaybackQuality(a)
    playVideo()
  }
  function setQuality(a:string) {
    handleQualityChange(a)
  }
  function nextPart() {
    let index = info.data.parts.findIndex((f) => f === currentPart);
    let part = info.data.parts[index + 1];
    if (!part) part = info.data.parts[0];
    handleCurrentPart(part);
    if (part.type === "video") {
      handleVideoYoutubeId(part.value);
      handleSeconds(part.startSeconds);
    }
  }

  const valueContext: IPlayer = {
    mute,
    pauseVideo,
    playVideo,
    seekTo,
    stopVideo,
    handleCurrentPart,
    player,
    nextPart,
    setQuality,
    qualityChange,
    info: info,
  };

  const divVideoWapperRef = useRef<HTMLDivElement>();
  const [widthHeightIframe, setWidthHeightIframe] = useState<{
    width: string | number;
    height: string | number;
  }>({
    width: "100%",
    height: "200%",
  });

  function resize() {
    if (divVideoWapperRef.current) {
      let parentWidth = divVideoWapperRef?.current?.offsetWidth;
      let widthTemp = divVideoWapperRef?.current?.offsetHeight * 1.777777777777778;
      let heightTemp = divVideoWapperRef?.current?.offsetHeight * 2;
      console.log(parentWidth, widthTemp, heightTemp);
      setWidthHeightIframe({
        width: parentWidth < widthTemp ? parentWidth : widthTemp,
        height: heightTemp,
      });
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resize, false);
    return () => window.removeEventListener("resize", resize, false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      resize();
    }, 100);
  }, [isFullscreen]);

  return (
    <appContext.Provider value={valueContext}>
      <FullScreen handle={screen} onChange={reportChange}>
        {!slug && <MissingVideo />}
        {slug &&
          (isLoading ? (
            <Loading />
          ) : (
            <div className="App">
              {!isReady && <Loading />}
              <Box className="wapper">
                <BannerComponent banner={bannerLeft} position="left" />
                <Box
                  flex={"auto"}
                  display="flex"
                  flexDirection={"column"}
                  style={{ position: "relative" }}
                >
                  <Navbar />
                  <div ref={divVideoWapperRef} style={{ flex: "auto", height: 0 }}>
                    <Box
                      width={"100%"}
                      height={"100%"}
                      style={{ overflow: "hidden", position: "relative", background: "black" }}
                    >
                      {status !== statePlayer.playing && !isMobile && (
                        <Button
                          style={{
                            position: "absolute",
                            zIndex: 9000,
                            top: "calc(50% - 30px)",
                            left: "calc(50% - 30px)",
                            width: 60,
                            height: 60,
                            backgroundColor: "rgba(255,255,255,0.0)",
                          }}
                          onClick={playVideo}
                        >
                          <Play className="ksjdfkjs" />
                        </Button>
                      )}
                      <ControlsOverlay fullscreen={screen} mobile={isMobile} />
                      {videoYoutubeId && (
                        <YouTube
                          id="asdfas"
                          videoId={videoYoutubeId}
                          onReady={onReady}
                          onPlaybackQualityChange={onPlaybackQualityChange}
                          onStateChange={onStateChange}
                          onEnd={onEnd}
                          opts={{
                            apiKey: "AIzaSyAIPuqxUv6XexqA1gFH6o4wFe21bhe0kKI",
                            // width:divVideoWapperRef?.current?.offsetHeight*1.777777777777778??'100%',
                            // height:divVideoWapperRef?.current?.offsetHeight*2??'200%',
                            width: widthHeightIframe.width,
                            height: widthHeightIframe.height,
                            playsinline: 1,
                            autoplay: 1,
                            playerVars: {
                              fs:0,
                              apiKey: "AIzaSyAIPuqxUv6XexqA1gFH6o4wFe21bhe0kKI",
                              autoplay: 1,
                              controls: 0,
                              playsinline: 1,
                              // rel: 0,
                              // showinfo: 0,
                              // mute: 0,
                              // loop: 1,
                            },
                          }}
                          iframeClassName="iframe"
                          title=""
                          className="youtube"
                        />
                      )}
                    </Box>
                  </div>
                  <BannerComponent banner={bannerBottom} position="bottom" />
                </Box>
                <BannerComponent banner={bannerRight} position="right" />
              </Box>
            </div>
          ))}
      </FullScreen>
    </appContext.Provider>
  );
};

const mapdispatch = (dispatch: any) => ({
  handleStateChange(state: number) {
    dispatch({ type: "stateChange", payload: state });
  },
  handleNavbar(state: boolean) {
    dispatch({ type: "navbar", payload: state });
  },
  handleReady(state: boolean) {
    dispatch({ type: "ready", payload: state });
  },
  handleFull(state: boolean) {
    dispatch({ type: "fullscreen", payload: state });
  },
  handleLoading(state: boolean) {
    dispatch({ type: "loading", payload: state });
  },
  handleVideoYoutubeId(state: string) {
    dispatch({ type: "videoYoutubeId", payload: state });
  },
  handleSeconds(state: number) {
    dispatch({ type: "seconds", payload: state });
  },
  handleTriggerPlay() {
    dispatch({ type: "trigerPlay" });
  },
  handleMute(state: boolean) {
    dispatch({ type: "mute", payload: state });
  },
  handleCurrentPart(state: VideoPart) {
    dispatch({ type: "setPart", payload: state });
  },
  setBanner(position: string, state: Banner) {
    dispatch({ type: position, payload: state });
  },
  setSetting(state: Settings) {
    dispatch({ type: "setSetting", payload: state });
  },
  handleQualityChange(state: string) {
    dispatch({ type: "QualityChange", payload: state });
  },
});

const mapStateToProps = (state: State) => ({
  status: state.status,
  open: state.isOpenNavbar,
  isLoading: state.isLoading,
  isReady: state.isReady,
  videoYoutubeId: state.videoYoutubeId,
  seconds: state.seconds,
  triggerPlay: state.triggerPlay,
  currentPart: state.currentPart,
  isFullscreen: state.isFullscreen,
  bannerLeft: state.bannerLeft,
  bannerRight: state.bannerRight,
  bannerBottom: state.bannerBottom,
});
export default connect(mapStateToProps, mapdispatch)(App);
