import {Box, ListItemIcon, Popper} from "@mui/material";
import {RouteType} from "../../routes/config";
import {Link} from "react-router-dom";
import React, {MutableRefObject, Ref, useEffect, useRef} from "react";
import {routeAtom} from "../../atom/routeAtom";
import {useAtomValue} from "jotai";
import {StyledListItemButton} from "./StyledListItemButton";
import {ListItemButtonContainer} from "./ListItemButtonContainer";

type Props = {
  item: RouteType;
  root?: boolean;
  setActiveItem: (value: string) => void;
  activeItem?: string;
  compact?: boolean;
  textVariant?: string;
};

const SidebarItem = ({item, root = false, setActiveItem, activeItem, compact, textVariant }: Props) => {
  const appState = useAtomValue(routeAtom);
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
  )
  
  if (!item.sidebarProps) return null;
  
  return (
    <ListItemButtonContainer root={root}>
      <StyledListItemButton
        {...item.path ? { component: Link } : {}}
        to={item.path}
        onClick={handleClick}
        selected={appState === item.state}
        variant={root ? "primary" : "secondary"}
        textVariant={textVariant}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {!compact && item.sidebarProps.displayText}
      </StyledListItemButton>
      {item.type === "popup" && popper}
    </ListItemButtonContainer>
  )
  
}

export default SidebarItem;
