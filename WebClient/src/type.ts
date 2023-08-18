export const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/videos";
export const thumbnail = [
  "https://i.ytimg.com/vi/Q11_Bga2dPU/maxresdefault.jpg",
  "https://i.ytimg.com/vi/4-OzzBgJZOw/maxresdefault.jpg",
];

export interface Size {
  width: number;
  height: number;
}
export interface VideoPart {
  deleted?: boolean;
  _id?: string;
  type?: "part" | "video" | "image";
  value?: string;
  startSeconds?: number; //thêm
  thumbnail?: string;
  videoId?: string;
  createdAt?: string;
  title?: string;
  videoYoutubeId?: string;
}
export interface VideoInfo {
  deleted?: boolean;
  _id?: string;
  title?: string;
  slug?: string;
  idVideoYoutube?: string;
  remark?: string;
  stamp?: string;
  isActive?: boolean;
  views?: number;
  createdAt?: string;
  createdBy?: User;
  updatedAt?: string;
  parts?: VideoPart[];
  banners?: Banner[];
  column1?:string;
  column2?:string;
  column3?:string;
  column4?:string;
  column5?:string;
  column6?:string;
  column7?:string;
  column8?:string;
  column9?:string;
  column10?:string;
}
export interface GetVideoResult {
  success?: boolean;
  message?: string;
  data?: VideoInfo;
}
export interface User {
  deleted?: boolean;
  _id?: string;
  fullname?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  avatar?: string;
  role?: string;
  allow?: boolean;
  createdAt?: string;
}
export interface Banner {
  deleted?: boolean;
  _id?: string;
  name?: string;
  createdAt?: string;
  position?: string;
  source?: string;
  videoId?: string;
  isActive?: boolean;
  link?: string;
}

export interface Settings {
  titleShowNavbar: string;
  titleHideNavbar: string;
}
