import { LOGIN_URL, API_URL } from "./configs";
import axios, { AxiosRequestConfig } from "axios";

const defaultAxiosSettings = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export const axiosApp = axios.create({
  baseURL: API_URL,
  ...defaultAxiosSettings,
});
export const loginCheckWidthError = (error) => {
  if (error?.response?.status === 401) {
    //redirect to login
    //localStorage.clear()
    //window.location.assign('/login')
  }
};

// export const getApi = (url) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url, { headers: getHeader() })
//       .then((d) => {
//         console.log(d);
//         resolve(d.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response.status === 401) {
//           //redirect to login
//           window.location.href = LOGIN_URL;
//         } else reject(error);
//       });
//   });
// };
