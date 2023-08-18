import { connect } from "react-redux";
import { State } from "../../store/reduxs";
import TimeLine from "./TimeLine";

const mapDispatchToProps = (dispatch:any) =>{

}

const mapStateToProps = (state:State) => ({
    status: state.status,
    isReady: state.isReady,
});

export default connect(mapStateToProps, null)(TimeLine);
