import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import { reduxRoot } from "./store/reduxs";
import MyAppRouter from "./Router";
import { createTheme  } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// let str = window.location.href;
// if (str.split("?").length > 1) {
//   let remove = str.slice(str.indexOf("?"), str.indexOf("#"));
//   let ak=str.replace(remove, "")
//   console.log(ak);
//   window.location.replace(ak)
// }

const theme = createTheme ({
  typography: {
    fontFamily: [
      'customFont',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
},
  [{
    '*': {
      fontFamily: [
        'customFont',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  }]);
const store = createStore(reduxRoot)
root.render(
  <ThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <MyAppRouter />
    </ReduxProvider>
  </ThemeProvider>
);
