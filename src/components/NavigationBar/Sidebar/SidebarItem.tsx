import {Box, ListItemIcon, Popper} from "@mui/material";
import {RouteType} from "../../../routes/types";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {routeAtom} from "../../../atom/routeAtom";
import {useAtom} from "jotai";
import {StyledListItemButton} from "./StyledListItemButton";
import {ListItemButtonContainer} from "./ListItemButtonContainer";
import themeConfig from "../themeConfig";

type Props = {
  item: RouteType;
  root?: boolean;
  setActiveItem: (value: string) => void;
  activeItem?: string;
  compact?: boolean;
  textVariant?: string;
};

const SidebarItem = ({item, root = false, setActiveItem, activeItem, compact, textVariant }: Props) => {
  const [routeState, setRouteState] = useAtom(routeAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setActiveItem(item.state);
    if (item.type !== "popup") return;
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    if(activeItem !== item.state) {
      setAnchorEl(null)
    };
  },[activeItem, item.state])
  
  const popper = (
    <Popper open={open} anchorEl={anchorEl} placement="right-start" sx={{
      left: "20px !important",
    }}>
      <Box sx={{
        padding: "24px",
        width: "282px",
        height: "330px",
        background: themeConfig.sidebar.selected.bg,
        boxShadow: "0px 2px 6px 2px rgba(167, 167, 167, 0.5)",
        borderRadius: "1rem"
      }}>
        <Box sx={{
          fontStyle: "normal",
          fontWeight: "medium",
          fontSize: "18px",
          lineHeight: "23px",
          display: "flex",
          alignItems: "center",
          color: "#FFFFFF"
        }}>
          Notifications
        </Box>
      </Box>
    </Popper>
  )
  
  if (!item.sidebarProps) return null;
  
  return (
    <ListItemButtonContainer root={root}>
      <StyledListItemButton
        {...item.path ? { component: Link } : {}}
        to={item.path}
        onClick={handleClick}
        selected={routeState === item.state}
        variant={root ? "primary" : "secondary"}
        textVariant={textVariant}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {!compact && item.sidebarProps.text}
        {!compact && item.sidebarProps.content}
      </StyledListItemButton>
      {item.type === "popup" && popper}
    </ListItemButtonContainer>
  )
  
}

export default SidebarItem;
