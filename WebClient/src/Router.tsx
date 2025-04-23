import { BrowserRouter, Route, Routes } from "react-router-dom";
import App2 from "./pages/App2";
import NotFound from "./pages/NotFound";

const MyAppRouter = () => {
  return (
      <BrowserRouter basename="">
        <Routes>
          <Route path="/player" element={<App2 />} />
          <Route path="/s/:slug" element={<App2 />} />
          {/* <Route path="/video" element={<App />} /> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
};
export default MyAppRouter;
