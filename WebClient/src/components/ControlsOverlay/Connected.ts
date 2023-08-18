import { connect, ConnectedProps } from "react-redux";
import { State } from "../../store/reduxs";
import ControlsOverlay from "./ControlsOverlay";


const mapStateToProps = (state:State) => ({
    status: state.status,
    isReady: state.isReady,
    isFull: state.isFullscreen,
    isMute: state.isMute,
    quality: state.quality,
});

export default connect(mapStateToProps, null)(ControlsOverlay);
