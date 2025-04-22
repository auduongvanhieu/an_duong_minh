import { Box, Button } from "@material-ui/core";
import { Settings } from "http2";
import { useCallback, useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { createGlobalStyle } from 'styled-components';
import { getInfo } from "../api";
import Navbar from "../components/Navbar";
import { appContext, IPlayer } from "../contexts/appContext";
import Expand from "../icons/Expand";
import UnExpand from "../icons/UnExpand";
import { State } from "../store/reduxs";
import { Banner, GetVideoResult, VideoPart } from "../type";

declare global {
  interface Window {
    zaloJSV2: any;
  }
}

const App2 = (props) => {
  const { handleVideoYoutubeId, handleCurrentPart, handleSeconds, handleMute, currentPart,
    handleTriggerPlay,
    videoYoutubeId,
    triggerPlay,
    seconds,
    isReady,
    handleStateChange,
    slugHomepage } = props;

  const [info, setInfo] = useState<GetVideoResult>();
  const [player, setPlayer] = useState<YouTubePlayer>({});
  const [searchParams] = useSearchParams();
  const slug = slugHomepage || searchParams.get("slug");

  useEffect(() => {
    // window.zaloJSV2 = {
    //   zalo_h5_event_handler: function (eventId, eventName, eventData) { }
    // };
  }, [])

  // useEffect(()=>{
  //   let j=setTimeout(() => {
  //     if(player)player.playVideo();
  //   }, 2000);
  //   return ()=>clearTimeout(j)
  // },[player])
  useEffect(() => {
    if (slug?.trim()) {
      getInfo(slug).then((data) => {
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
        // getFont(data.data.column7).then(x=>{
        //   console.log(x)
        // })
      });
    }
  }, []);
  const screen = useFullScreenHandle();
  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen) {
        //handleFull(state);
      }
    },
    [screen]
  );
  const divVideoWapperRef = useRef<HTMLDivElement>();
  const [isFull, setIsFull] = useState(false);
  const [widthHeightIframe, setWidthHeightIframe] = useState<{
    width: string | number;
    height: string | number;
  }>({
    width: "100%",
    height: "100%",
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
  const handleFullScreen = () => {
    if (isFull) {
      setIsFull(false);
      screen.exit();
    } else {
      setIsFull(true);
      screen.enter();
    }
  };
  useEffect(() => {
    // window.addEventListener("resize", resize, false);
    // return () => window.removeEventListener("resize", resize, false);
  }, []);
  //console.log(isReady);
  useEffect(() => {
    if (isReady) {
      //console.log("READY HANDLE", seconds);
      player.playVideo();
      player.seekTo(seconds);
      // setTimeout(() => {
      //   let a = player.getPlayerState();
      //   console.log(a);
      //   if (a !== 1) player.playVideo();
      // }, 1000);
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
    info: info,
    qualityChange: () => { },
    setQuality: () => { }
  };

  const onReady = (e: YouTubeEvent) => {
    //console.log("READY CALL");
    console.log(e);
    setPlayer(() => e.target);
    // setTimeout(() => {
    //   handleTriggerPlay();
    // }, 2500);
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
    console.log('onPlaybackQualityChange: ', data);
    //handleQualityChange(data);
  };

  const onEnd = () => {
    //console.log("END OF VIDEO ", gg);
    //nextPart();
  };

  return (
    <>
      <appContext.Provider value={valueContext}>
        <FullScreen handle={screen} onChange={reportChange}>
          <GlobalStyle url={info?.data?.column7} color={info?.data?.column10} />
          <div ref={divVideoWapperRef} style={{ width: "100%", height: "100%", background: "red" }}>
            <Navbar />
            <Box
              width={"100%"}
              height={"100%"}
              style={{ overflow: "hidden", position: "relative", background: "black" }}
            >
              {videoYoutubeId && (
                <>
                  <YouTube
                    id="asdfas"
                    videoId={videoYoutubeId}
                    onReady={onReady}
                    onPlaybackQualityChange={onPlaybackQualityChange}
                    onStateChange={onStateChange}
                    onEnd={onEnd}
                    //   onReady={onReady}
                    //   onPlaybackQualityChange={onPlaybackQualityChange}
                    //   onStateChange={onStateChange}
                    //   onEnd={onEnd}
                    opts={{
                      playsinline: 1,
                      autoplay: 1,
                      playerVars: {
                        fs: 0,
                        autoplay: 1,
                        controls: 1,
                        playsinline: 1,
                        // rel: 0,
                        // showinfo: 0,
                        // mute: 0,
                        // loop: 1,
                      },
                    }}
                    iframeClassName="iframe2"
                    title=""
                    style={{ width: "100%", height: "100%" }}
                  />
                  <Box
                    style={{
                      background: "black",
                      height: 38,
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                  >
                    {!isFull && (
                      <Button onClick={handleFullScreen} style={{ color: "#fff" }}>
                        <Expand />
                      </Button>
                    )}
                    {isFull && (
                      <Button onClick={handleFullScreen} style={{ color: "#fff" }}>
                        <UnExpand />
                      </Button>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </div>
        </FullScreen>
      </appContext.Provider>
    </>
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
export default connect(mapStateToProps, mapdispatch)(App2);


const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: customFont;
  src: url('${props => props.url}');
  font-weight: bold;
}

*::-webkit-scrollbar-thumb {
  background-color: ${props => props.color};    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid ${props => props.color};  /* creates padding around scroll thumb */
}
`