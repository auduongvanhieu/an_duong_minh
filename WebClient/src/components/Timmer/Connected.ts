import { connect } from "react-redux";
import { State } from "../../store/reduxs";
import Timmer, { NavbarProps } from "./Timmer";


const mapDispatchToProps = (dispatch: any) => {};

const mapStateToProps = (state: State) => ({
  status: state.status,
});

export default connect(mapStateToProps, null)(Timmer);
