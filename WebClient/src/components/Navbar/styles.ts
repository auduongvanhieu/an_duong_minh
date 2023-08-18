import createStyles from "@material-ui/styles/createStyles";

const styles = (theme: any) =>
  createStyles({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1000,
      width: "100%",
      clear: "both",
    },
    mainBox: {
      height: 0,
      transition: " all linear 0.2s",
      paddingBottom: 10,
      overflowY: "hidden",
    },
    open: {
      height: 100,
    },
    contentBox: {
      height: 90,
      padding: 10,
      display: "flex",
      flexDirection: "row",
    },
    middleBox: {
      flex: "auto",
      width: 0,
      overflowX: "auto",
      "&::-webkit-scrollbar": {
        height: "10px",
      },
      "&-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 5px grey",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        // background: "#264E85",
        borderRadius: " 10px",
        "&:hover": {
          // background: "#1E3E69",
        },
      },
    },
    itemBox: {
      width: 145,
      height: "calc(100% - 10px)",
      marginLeft: 10,
      display: "inline-flex",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      cursor: "pointer",
      alignItems:'center',
      justifyContent:'center',
      justifyItems:'center',
    },
    buttonScroll: {
      color: "white",
      width: 30,
      height: "100%",
      paddingLeft: "3px !important",
      paddingRight: "3px !important",
    },
    titleText: {
      fontSize: 12,
      padding:'3px 8px',
      borderRadius:20,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
    textAlign:'center'
    },
    active: {
      border:'solid 3px red'
    },
    disabledbutton :{
      pointerEvents: 'none',
      opacity: 0.8,
  }
  });

export default styles;
