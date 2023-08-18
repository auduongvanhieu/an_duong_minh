import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import styles from "./styles";
import withStyles from "@material-ui/styles/withStyles";
import { YouTubePlayer } from "react-youtube";
import { statePlayer } from "../../store/reduxs";
import { appContext } from "../../contexts/appContext";
import Left from "../../icons/Left";
import Check from "../../icons/Check";

export interface NavbarProps {
  status: statePlayer;
  isReady: boolean;
  quality: string;
  back: ()=>void;
  selected: (a:string)=>void;
}

const QualitySelector: React.FC<NavbarProps & WithStyles<typeof styles>> = (props) => {
  const {  status, classes, isReady,quality ,back,selected} = props;

  return (
    <List>
                        <ListItem button onClick={back}>
                          <ListItemIcon>
                            <Left style={{ fill: "white" }} />
                          </ListItemIcon>
                          <ListItemText>Quay lại</ListItemText>
                        </ListItem>
                        <ListItem button onClick={()=>selected('highres')}>
                          <ListItemIcon>
                            {quality==='highres'&&<Check style={{ fill: "white" }} />}
                          </ListItemIcon>
                          <ListItemText>highres</ListItemText>
                        </ListItem>
                        <ListItem button onClick={()=>selected('hd1080')}>
                          <ListItemIcon>
                            {quality==='hd1080'&&<Check style={{ fill: "white" }} />}
                          </ListItemIcon>
                          <ListItemText>hd1080</ListItemText>
                        </ListItem>
                        <ListItem button onClick={()=>selected('hd720')}>
                          <ListItemIcon>
                            {quality==='hd720'&&<Check style={{ fill: "white" }} />}
                          </ListItemIcon>
                          <ListItemText>hd720</ListItemText>
                        </ListItem>
                        <ListItem button onClick={()=>selected('large')}>
                          <ListItemIcon>
                            {quality==='large'&&<Check style={{ fill: "white" }} />}
                          </ListItemIcon>
                          <ListItemText>large</ListItemText>
                        </ListItem>
                        <ListItem button onClick={()=>selected('medium')}>
                          <ListItemIcon>
                            {quality==='medium'&&<Check style={{ fill: "white" }} />}
                          </ListItemIcon>
                          <ListItemText>medium</ListItemText>
                        </ListItem>
                        <ListItem button onClick={()=>selected('small')}>
                          <ListItemIcon>
                            {quality==='small'&&<Check style={{ fill: "white" }} />}
                          </ListItemIcon>
                          <ListItemText>small</ListItemText>
                        </ListItem>
                      </List>
  );
};
export default withStyles(styles)(QualitySelector);
