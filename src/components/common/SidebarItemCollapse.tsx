import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import colorConfigs from "../../configs/colorConfigs";
import {RouteType} from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import {useAtomValue} from "jotai";
import {routeAtom} from "../../atom/atom";

type Props = {
  item: RouteType;
  root?: boolean;
};

const SidebarItemCollapse = ({item, root}: Props) => {
  const [open, setOpen] = useState(false);
  const appState = useAtomValue(routeAtom);
  
  
  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);
  
  if (!item.sidebarProps) return null;
  
  if (root) return (
    <div style={{
      display: "flex",
      flexDirection: item.stickToBottom ? "column-reverse": "column",
      marginBottom: "1rem",
      ...(item.stickToBottom ? {marginTop: "auto" }: {})
    }}>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          height: "56px",
          borderRadius: "6px",
          background: "unset",
          margin: "0 12px",
          paddingLeft: "28px",
          "&: hover": {
            color: "#102347",
            "& .MuiListItemIcon-root": {
              color: "#364BB5"
            }
          },
          ...(appState === item.state ? {
            backgroundColor: colorConfigs.sidebar.activeBg,
            color: "#FFFFFF"
          } : {}),
          "& .MuiListItemIcon-root": {
            minWidth: "40px",
            color: "#364BB5",
            ...(appState === item.state ? {
              color: "#FFFFFF"
            } : {})
          }
        }}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={item.sidebarProps.displayText}
        />
        {open ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/>}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item.child?.map((route, index) => (
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index}/>
              ) : (
                <SidebarItem item={route} key={index}/>
              )
            ) : null
          ))}
        </List>
      </Collapse>
    </div>
  );
  
  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          height: "40px",
          borderRadius: "6px",
          background: "unset",
          margin: "0 12px",
          paddingLeft: "28px",
          "&: hover": {
            color: "#102347",
            "& .MuiListItemIcon-root": {
              color: "#364BB5"
            }
          },
          ...(appState === item.state ? {
            backgroundColor: colorConfigs.sidebar.activeBg,
            color: "#FFFFFF"
          } : {}),
          "& .MuiListItemIcon-root": {
            minWidth: "40px",
            color: "#364BB5",
            ...(appState === item.state ? {
              color: "#FFFFFF"
            } : {})
          }
        }}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={item.sidebarProps.displayText}
        />
        {open ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/>}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item.child?.map((route, index) => (
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index}/>
              ) : (
                <SidebarItem item={route} key={index}/>
              )
            ) : null
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarItemCollapse;
