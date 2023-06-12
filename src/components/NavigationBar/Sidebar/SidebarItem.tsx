import {Box, ListItemIcon, Popper} from "@mui/material";
import {RouteType} from "../../../routes/types";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useCurrentRoute} from "../state/useCurrentRoute";
import {useAtom} from "jotai";
import {StyledListItemButton} from "./StyledListItemButton";
import {ListItemButtonContainer} from "./ListItemButtonContainer";
import themeConfig from "../themeConfig";
import {sidebarItemAtom} from "../state/sidebarItem";
import {useAtomValue} from "jotai";
import {sidebarAtom} from "../state/sidebar";

type Props = {
  item: RouteType;
  root?: boolean;
  textVariant?: string;
  full: boolean;
};

const SidebarItem = ({ item, root = false, textVariant, full  }: Props) => {
  const currentRoute = useCurrentRoute();
  const routeState = currentRoute?.state;
  const [activeSidebarItem, setActiveSidebarItem] = useAtom(sidebarItemAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setActiveSidebarItem(item.state);
    if (item.type !== "popup") return;
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    if(activeSidebarItem !== item.state) {
      setAnchorEl(null)
    };
  },[activeSidebarItem, item.state])
  
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
        selected={(routeState || "home") === item.state}
        variant={root ? "primary" : "secondary"}
        textVariant={textVariant}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {full && item.sidebarProps.text}
        {full && item.sidebarProps.content}
      </StyledListItemButton>
      {item.type === "popup" && popper}
    </ListItemButtonContainer>
  )
  
}

export default SidebarItem;
