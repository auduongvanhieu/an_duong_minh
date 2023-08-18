import { connect } from "react-redux";
import { State } from "../../store/reduxs";
import Timmer, { NavbarProps } from "./Banner";


const mapDispatchToProps = (dispatch: any) => {};

const mapStateToProps = (state: State) => ({
  isFullscreen: state.isFullscreen,
});

export default connect(mapStateToProps, null)(Timmer);
