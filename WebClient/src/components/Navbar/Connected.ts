import { connect, ConnectedProps } from "react-redux";
import { State } from "../../store/reduxs";
import Navbar from "./Navbar";

const mapDispatchToProps = (dispatch: any) => ({
  handleNavbar(state: boolean) {
    dispatch({ type: "navbar", payload: state });
  },
  handleVideoYoutubeId(state: string) {
    dispatch({ type: "videoYoutubeId", payload: state });
  },
  handleSeconds(state: number) {
    dispatch({ type: "seconds", payload: state });
  },
  handleTriggerPlay() {
    dispatch({ type: "trigerPlay"});
  },
});

const mapStateToProps = (state: State) => ({
  open: state.isOpenNavbar,
  videoYoutubeId: state.videoYoutubeId,
  state:state.status,
  currentPart:state.currentPart,
  settings:state.settings
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
