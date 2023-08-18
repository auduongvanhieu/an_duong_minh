import createStyles from "@material-ui/styles/createStyles";

const styles=(theme:any)=>
  createStyles({
    wapper: {
      background:'rgba(255,0,0,0.0)',
      position:'absolute',
      top:0,
      left:0,
      zIndex:900,
    },

    controls:{
      color:'white',
      padding:'30px 60px',
      display:'flex',
      justifyContent:'space-between',
      backgroundColor: 'tranparent',
  backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1))',
    },
    controlButton:{
      color:'white'
    },
    controlButtonMobile:{
      color:'white',
      fontSize:12
    },
    controlText:{
      color:'white'
    },
    timeBar:{
      padding:'0px 30px',
    },
    timeBarBackground:{
      height:5,
      background:'rgba(255,255,255,0.3)',
    },
    timeBarBackgroundRun:{
      height:5,
      background:'red',
    }
  })

export default styles;
