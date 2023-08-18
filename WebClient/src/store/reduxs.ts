import { combineReducers, ReducersMapObject } from "redux";
import { createReducer } from "redux-act";
import { Banner, Settings, VideoPart } from "../type";
import * as actions from "./actions";

export enum statePlayer {
  "unstarted" = -1,
  "ended" = 0,
  "playing" = 1,
  "paused" = 2,
  "buffering" = 3,
  "videocued" = 5,
}

export interface State {
  status?: statePlayer;
  isOpenNavbar: boolean;
  isReady: boolean;
  isFullscreen: boolean;
  isMute: boolean;
  isLoading: boolean;
  videoYoutubeId: string;
  seconds: number;
  triggerPlay: number;
  currentPart: VideoPart;
  bannerLeft: Banner;
  bannerRight: Banner;
  bannerBottom: Banner;
  settings: Settings;
  quality: string;
}
const initSettings:Settings={
  titleHideNavbar:'Hiển thị',
  titleShowNavbar:'Ẩn'
}
const init: State = {
  status: statePlayer.unstarted,
  isOpenNavbar: true,
  isReady: false,
  isFullscreen: false,
  isMute: false,
  isLoading: true,
  videoYoutubeId: "",
  seconds: 0,
  triggerPlay: 0,
  currentPart: null,
  bannerLeft: null,
  bannerRight: null,
  bannerBottom: null,
  settings:initSettings,
  quality: "",
};
export const reduxRoot = (state = init, action: any) => {
  switch (action.type) {
    case "stateChange":
      return { ...state, status: action.payload };
    case "navbar":
      return { ...state, isOpenNavbar: action.payload };
    case "ready":
      return { ...state, isReady: action.payload };
    case "fullscreen":
      return { ...state, isFullscreen: action.payload };
    case "mute":
      return { ...state, isMute: action.payload };
    case "loading":
      return { ...state, isLoading: action.payload };
    case "videoYoutubeId":
      let s = state.videoYoutubeId === action.payload;
      return { ...state, videoYoutubeId: action.payload, isReady: s, triggerPlay: state.triggerPlay + (s ? 1 : 0) };
    case "seconds":
      return { ...state, seconds: action.payload };
    case "trigerPlay":
      return { ...state, triggerPlay: state.triggerPlay + 1, isReady: true };
    case "setPart":
      return { ...state, currentPart: action.payload };
    case "setBannerLeft":
      return { ...state, bannerLeft: action.payload };
    case "setBannerRight":
      return { ...state, bannerRight: action.payload };
    case "setBannerBottom":
      return { ...state, bannerBottom: action.payload };
    case "setSetting":
      return { ...state, settings: action.payload };
    case "QualityChange":
      return { ...state, quality: action.payload };
    default:
      return { ...state };
  }
};
