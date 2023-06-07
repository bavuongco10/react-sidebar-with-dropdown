import {Box, ListItemButton, ListItemIcon, Popper} from "@mui/material";
import {useSelector} from "react-redux";
import colorConfigs from "../../configs/colorConfigs";
import {RootState} from "../../redux/store";
import {RouteType} from "../../routes/config";
import {Link} from "react-router-dom";
import React from "react";

type Props = {
  item: RouteType;
  root?: boolean;
};

const SidebarItem = ({item, root = false}: Props) => {
  const {appState} = useSelector((state: RootState) => state.appState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (item.type !== "popup") return;
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  
  if (!item.sidebarProps || !item.path) return null;
  
  if (root) return (
    <div style={{marginBottom: "1rem"}}>
      <ListItemButton
        onClick={handleClick}
        component={Link}
        to={item.path}
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
        {item.sidebarProps.displayText}
      </ListItemButton>
      {item.type === "popup" && <Popper key={open.toString()} open={open} anchorEl={anchorEl} placement="right-start" sx={{
        transform: "translate3d(280px, 300px, 0px) !important"
      }}>
        <Box sx={{
          padding: "24px",
          width: "282px",
          height: "330px",
          background: "#364BB5",
          boxShadow: "0px 2px 6px 2px rgba(167, 167, 167, 0.5)",
          borderRadius: "1rem"
        }}>
          <div style={{
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "23px",
            display: "flex",
            alignItems: "center",
            color: "#FFFFFF"
          }}>
            Notifications
          </div>
        </Box>
      </Popper>
      }
    </div>
  )
  
  return (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        height: "40px",
        borderRadius: "6px",
        background: "unset",
        margin: "0 12px",
        paddingLeft: "28px",
        "&: hover": {
          color: "#364BB5",
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
        {item.sidebarProps?.icon && item.sidebarProps?.icon}
      </ListItemIcon>
      {item.sidebarProps?.displayText}
    </ListItemButton>
  )
}

export default SidebarItem;
