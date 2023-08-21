import axios from "axios";
import { GetVideoResult, Settings } from "./type";
const API_URL = "http://api-video-player.viwo.vn";
export const getInfo = (slug: string) => {
  return axios.get<GetVideoResult>(`${API_URL}/video/${slug}`).then((res) => res.data);
  return new Promise<GetVideoResult>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "get video information successfully",
        data: {
          deleted: false,
          _id: "62b2921bb35d866e86116c33",
          title: "Video Demo 01 Nhe",
          slug: "video-demo-01-nhe",
          remark: "abccc",
          stamp: "asdnasda",
          isActive: true,
          views: 39,
          createdAt: "2020-11-23T06:48:49.216Z",
          createdBy: {
            deleted: false,
            _id: "62b29129b35d866e86116c28",
            fullname: "Nguyen Admin",
            username: "admin",
            email: "thanhbinh.ltmt@gmail.com",
            phoneNumber: "0987654321",
            gender: "male",
            avatar: "/images/img-post-3.jpg",
            role: "admin",
            allow: true,
            createdAt: "2020-11-23T06:48:49.216Z",
          },
          updatedAt: "2022-06-22T09:15:47.838Z",
          parts: [
            {
              deleted: false,
              _id: "62b292beb35d866e86116c36",
              type: "video",
              value: "KzbTNFzg7lU",
              startSeconds:40,
              thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              videoId: "62b2921bb35d866e86116c33",
              createdAt: "2020-11-23T06:48:49.216Z",
              title: "Start",
            },
            {
              deleted: false,
              _id: "62b292beb35d866e86116c36",
              type: "part",
              value: "90",
              startSeconds:90,
              thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              videoId: "62b2921bb35d866e86116c33",
              createdAt: "2020-11-23T06:48:49.216Z",
              title: "Su menh",
            },
            {
              deleted: false,
              _id: "62b297d3b35d866e86116c6e",
              type: "part",
              value: "130",
              startSeconds:130,
              thumbnail: "https://i.pinimg.com/564x/56/07/a6/5607a691b9cb376410f4f142ee634820.jpg",
              videoId: "62b2921bb35d866e86116c33",
              createdAt: "2020-11-23T06:48:49.216Z",
              title: "Tam nhin",
            },
            {
              deleted: false,
              _id: "62b2986db35d866e86116c6f",
              type: "part",
              value: "210",
              startSeconds:300,
              thumbnail: "https://i.pinimg.com/564x/46/b3/1f/46b31f90f94b630d2dae0a35e14f4b2d.jpg",
              videoId: "62b2921bb35d866e86116c33",
              createdAt: "2020-11-23T06:48:49.216Z",
              title: "Chien luoc",
            },
            {
              deleted: false,
              _id: "62b2988db35d866e86116c70",
              type: "video",
              startSeconds:90,
              value: "8sBP4y1qeLc",
              thumbnail: "https://i.pinimg.com/564x/40/0e/b8/400eb8a3081a741b593f12591ac40036.jpg",
              videoId: "62b2921bb35d866e86116c33",
              createdAt: "2020-11-23T06:48:49.216Z",
              title: "Video moi",
            },
            {
              deleted: false,
              _id: "62b2c953b35d866e86116c92",
              type: "part",
              value: "35",
              startSeconds:125,
              thumbnail: "https://i.pinimg.com/564x/8f/0d/2f/8f0d2f46e16d7373887766948d7438b0.jpg",
              videoId: "62b2c8c5b35d866e86116c8f",
              createdAt: "2020-11-23T06:48:49.216Z",
              title: "Quảng Cáo",
            },
            {
              deleted: false,
              _id: "62b2c973b35d866e86116c94",
              type: "part",
              value: "99",
              startSeconds:169,
              thumbnail: "https://i.pinimg.com/564x/8f/0d/2f/8f0d2f46e16d7373887766948d7438b0.jpg",
              videoId: "62b2c8c5b35d866e86116c8f",
              createdAt: "2020-11-23T06:48:49.216Z",
              title: "Bế Mạc",
            },
          ],
          banners: [
            {
              deleted: false,
              _id: "62b2961bb35d866e86116c66",
              name: "Banner Demo 01 nhe",
              createdAt: "2020-11-23T06:48:49.216Z",
              position: "left",
              source: "https://i.pinimg.com/564x/3f/49/89/3f4989b478d34dfea4ce7c23710c77fb.jpg",
              videoId: "62b2921bb35d866e86116c33",
              isActive: true,
              link: "https://google.com",
            },
            {
              deleted: false,
              _id: "62b297b4b35d866e86116c6a",
              name: "Banner Demo 02 nhe",
              createdAt: "2020-11-23T06:48:49.216Z",
              position: "right",
              source: "https://i.pinimg.com/564x/89/40/50/894050e74bfe0350e6b3cf6ad60adefc.jpg",
              videoId: "62b2921bb35d866e86116c33",
              isActive: true,
              link: "https://google.com",
            },
            {
              deleted: false,
              _id: "62b297b4b35d866e86116c6a",
              name: "Banner Demo 03 nhe",
              createdAt: "2020-11-23T06:48:49.216Z",
              position: "bottom   ",
              source: "https://i.pinimg.com/564x/89/40/50/894050e74bfe0350e6b3cf6ad60adefc.jpg",
              videoId: "62b2921bb35d866e86116c33",
              isActive: true,
              link: "https://google.com",
            },
          ],
        },
      });
    }, 3000);
  });

};

export const getFont=(url:string)=>{
  return axios({
    url, //your url
    method: 'GET',
    responseType: 'blob', // important
    headers:{
      'Accept': 'font/ttf',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    }
}).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
});
}

export const getSetting=()=>{
  return new Promise<Settings>((resolve) => {
    setTimeout(() => {
      resolve({
        titleHideNavbar:"Ẩn",
        titleShowNavbar:"Chọn nội dung"
      })
    }, 3000);
  })
}
