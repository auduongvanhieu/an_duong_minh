import { connect } from "react-redux";
import { State } from "../../store/reduxs";
import TimeLine from "./QualitySelector";

const mapDispatchToProps = (dispatch:any) =>{

}

const mapStateToProps = (state:State) => ({
    status: state.status,
    isReady: state.isReady,
    quality: state.quality,
});

export default connect(mapStateToProps, null)(TimeLine);
