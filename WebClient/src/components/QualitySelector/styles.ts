import createStyles from "@material-ui/styles/createStyles";

const styles=(theme:any)=>
  createStyles({
    timeBar:{
      padding:'0px 30px',
    },
    timeBarBackground:{
      height:5,
      background:'rgba(255,255,255,0.3)',
      cursor:'pointer',
      position:'relative',
    },
    timeBarBackgroundRun:{
      height:5,
      background:'red',
      cursor:'pointer',
      position:'absolute',
      top:0,
      left:0,
      zIndex:1
    },
    timeBarClick:{
      height:5,
      cursor:'pointer',
      position:'absolute',
      top:0,
      left:0,
      zIndex:2,
      width:'100%'
    },
  })

export default styles;
