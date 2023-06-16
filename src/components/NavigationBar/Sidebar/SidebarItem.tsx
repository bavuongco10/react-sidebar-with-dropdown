import {Box, List, ListItemButton, ListItemIcon, ListItemText, Popper} from "@mui/material";
import {RouteType} from "../../../routes/types";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {StyledListItemButton} from "./StyledListItemButton";
import {ListItemButtonContainer} from "./ListItemButtonContainer";
import themeConfig from "../themeConfig";
import assets from "../../../assets";
import {
  activeSidebarCollapseAtom,
  activeSidebarItemLevel1Atom,
  activeSidebarItemLevel2Atom,
  reCalAtom
} from "../state/sidebar";

type Props = {
  item: RouteType;
  root?: boolean;
  textVariant?: string;
  full: boolean;
};

const SidebarItem = ({ item, root = false, textVariant, full }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [level1, setItemLevel1] = useAtom(activeSidebarItemLevel1Atom);
  const [level2, setItemLevel2] = useAtom(activeSidebarItemLevel2Atom);
  const [reCal, setReCal] = useAtom(reCalAtom);
  const [activeSidebarCollapse, setActiveSidebarCollapse] = useAtom(activeSidebarCollapseAtom);

  const isProfile = item.state === "profile.language";
  const isNotification = item.state === "notifications";
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if(root) {
      setItemLevel1(item.state);
    }
    setItemLevel2(item.state);
    
    if(root) {
      setActiveSidebarCollapse("");
    }
    
    if (item.type !== "popup") return;
    if (anchorEl) {
      setAnchorEl(null);
      setReCal(new Date().getTime());
    } else {
      setTimeout(() => {
        setAnchorEl(containerRef.current);
      }, 450);
    }
  };
  
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    if(item.type !== "popup") return;
    if(level2 !== item.state) {
      setAnchorEl(null);
    }
  },[level2, item.state])
  
  
  const popper1 = (
    <Popper open={open} anchorEl={anchorEl} placement="right-start" sx={{
      left: "10px !important",
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
  
  const popper2 = (
    <Popper open={open} anchorEl={anchorEl} placement="right-start" sx={{
      left: "-12px !important",
      zIndex: "3000"
    }}>
      <Box sx={{
        width: "180px",
        background: "white",
        boxShadow: "0px 2px 6px 2px rgba(167, 167, 167, 0.5)",
        borderRadius: "1rem"
      }}>
        <Box sx={{
          fontStyle: "normal",
          fontWeight: "medium",
          fontSize: "16px",
          lineHeight: "20px",
          display: "flex",
          alignItems: "center",
          color: "#19181A",
        }}>
          <List sx={{
            width: "100%"
          }}>
            <ListItemButton
            >
              <ListItemIcon>
                <img src={assets.images.flagUS} />
              </ListItemIcon>
              <span>English</span>
            </ListItemButton>
            <ListItemButton
            >
              <ListItemIcon>
              <img src={require('../../../assets/images/germany.png')} />
              </ListItemIcon>
              <span>German</span>
            </ListItemButton>
            <ListItemButton
            >
              <ListItemIcon>
              <img src={require('../../../assets/images/french.png')} />
              </ListItemIcon>
              <span>French</span>
            </ListItemButton>
            <ListItemButton
            >
              <ListItemIcon>
              
              <img src={require('../../../assets/images/spain.png')} />
              </ListItemIcon>
              <span>Spanish</span>
            </ListItemButton>
            <ListItemButton
            >
              <ListItemIcon>
              <img src={require('../../../assets/images/japan.png')} />
              </ListItemIcon>
              <span>Japanese</span>
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Popper>
  )
  
  if (!item.sidebarProps) return null;
  
  return (
    <ListItemButtonContainer root={root} ref={containerRef}>
      <StyledListItemButton
        {...item.path ? { component: Link } : {}}
        to={item.path}
        onClick={handleClick}
        selected={root ? level1 === item.state : level2 === item.state}
        variant={root ? "primary" : "secondary"}
        textVariant={textVariant}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {full && <ListItemText disableTypography primary={item.sidebarProps.text} />}
        {full && item.sidebarProps.content}
      </StyledListItemButton>
      {item.type === "popup" && isNotification && popper1}
      {item.type === "popup" && isProfile && popper2}
    </ListItemButtonContainer>
  )
  
}

export default SidebarItem;
