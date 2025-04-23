import { Routes, Route, Outlet, Link, useMatch, useResolvedPath, Navigate, BrowserRouter, Router, useRoutes, HashRouter } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import App2 from "./pages/App2";

const MyAppRouter = () => {
  return (
      <BrowserRouter basename="">
        <Routes>
          <Route path="/player" element={<App2 />} />
          <Route path="/v/:slug" element={<App2 />} />
          {/* <Route path="/video" element={<App />} /> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
};
export default MyAppRouter;
//domain.com?id=xxx
