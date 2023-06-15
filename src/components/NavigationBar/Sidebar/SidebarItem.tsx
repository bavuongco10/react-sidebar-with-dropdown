import {Box, ListItemIcon, Popper, Stack} from "@mui/material";
import {RouteType} from "../../../routes/types";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useCurrentRoute} from "../state/useCurrentRoute";
import {useAtom} from "jotai";
import {StyledListItemButton} from "./StyledListItemButton";
import {ListItemButtonContainer} from "./ListItemButtonContainer";
import themeConfig from "../themeConfig";
import {sidebarItemAtom} from "../state/sidebarItem";
import assets from "../../../assets";
import {activeSidebarItemLevel1Atom, activeSidebarItemLevel2Atom, reCalAtom} from "../state/sidebar";

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
  
  const [level1, setItemLevel1] = useAtom(activeSidebarItemLevel1Atom);
  const [level2, setItemLevel2] = useAtom(activeSidebarItemLevel2Atom);
  const [reCal, setReCal] = useAtom(reCalAtom);

  const isProfile = item.state === "profile.my-profile";
  const isNotification = item.state === "notifications";
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setActiveSidebarItem(item.state);
    if (item.type !== "popup") return;
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  // const isPopup =  item.type === "popup";
  // useEffect(() => {
  //
  //   if(open) {
  //     setItemLevel2(item.state);
  //   } else {
  //     console.log(open)
  //     setReCal(new Date().getTime());
  //   }
  // },[type, open, level2, item.state])
  //
  // useEffect(() => {
  //   if(level2 !== item.state) {
  //     setAnchorEl(null)
  //   };
  // },[open, level2, item.state])
  
  
  // useEffect(() => {
  //   if(activeSidebarItem !== item.state) {
  //     setAnchorEl(null)
  //   };
  // },[activeSidebarItem, item.state])
  
  const popper1 = (
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
  
  const popper2 = (
    <Popper open={open} anchorEl={anchorEl} placement="right-start" sx={{
      left: "0 !important",
      zIndex: "3000"
    }}>
      <Box sx={{
        padding: "24px",
        width: "180px",
        height: "272px",
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
          <Stack spacing={2.5}>
            <Stack
              direction="row"
              spacing={2.5}
              alignItems="center"
            >
              <img src={assets.images.flagUS} />
              <span>English</span>
            </Stack>
            <Stack
              direction="row"
              spacing={2.5}
              alignItems="center"
            >
              <img src={require('../../../assets/images/germany.png')} />
              <span>German</span>
            </Stack>
            <Stack
              direction="row"
              spacing={2.5}
              alignItems="center"
            >
              <img src={require('../../../assets/images/french.png')} />
              <span>French</span>
            </Stack>
            <Stack
              direction="row"
              spacing={2.5}
              alignItems="center"
            >
              <img src={require('../../../assets/images/spain.png')} />
              <span>Spanish</span>
            </Stack>
            <Stack
              direction="row"
              spacing={2.5}
              alignItems="center"
            >
              <img src={require('../../../assets/images/japan.png')} />
              <span>Japanese</span>
            </Stack>
          </Stack>
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
        selected={level2 === item.state}
        variant={root ? "primary" : "secondary"}
        textVariant={textVariant}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {full && item.sidebarProps.text}
        {full && item.sidebarProps.content}
      </StyledListItemButton>
      {item.type === "popup" && isNotification && popper1}
      {item.type === "popup" && isProfile && popper2}
    </ListItemButtonContainer>
  )
  
}

export default SidebarItem;
