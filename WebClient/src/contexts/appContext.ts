import React, { createContext } from "react";
import { YouTubePlayer } from "react-youtube";
import { GetVideoResult, VideoPart } from "../type";

export interface IPlayer {
  seekTo: (number: number) => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  playVideo: () => void;
  nextPart: () => void;
  mute: (a: boolean) => void;
  qualityChange: (a: string) => void;
  setQuality: (a: string) => void;
  handleCurrentPart: (a: VideoPart) => void;
  player: YouTubePlayer;
  info: GetVideoResult;
}
export const noop = () => {};

export const appContext = createContext<IPlayer>({
  seekTo: noop,
  pauseVideo: noop,
  stopVideo: noop,
  playVideo: noop,
  mute: noop,
  handleCurrentPart: noop,
  nextPart: noop,
  qualityChange: noop,
  setQuality: noop,
  player: null,
  info: null,
});
