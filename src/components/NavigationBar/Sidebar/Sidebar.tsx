import {Drawer as MuiDrawer, List, Box, Toolbar} from "@mui/material";
import {appRoutes} from "../../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import {useEffect, useState} from "react";
import {useAtomValue, useSetAtom} from "jotai";
import {useCurrentRoute} from "../state/useCurrentRoute";
import {styled, Theme, CSSObject} from '@mui/material/styles';
import themeConfig from "../themeConfig";
import {sidebarAtom} from "../state/sidebar";
import {sidebarItemAtom} from "../state/sidebarItem";
import MenuButton from "./MenuButton";

const openedMixin = (theme: Theme): CSSObject => ({
  borderRight: "0px",
  background: themeConfig.sidebar.bg,
  width: themeConfig.width.sidebar.full,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  borderRight: "0px",
  background: themeConfig.sidebar.bg,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: themeConfig.width.sidebar.mini,
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: themeConfig.width.sidebar.full,
    flexShrink: 0,
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



interface SidebarListProps {
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
  full: boolean;
}

const SidebarList = ({ onMouseLeave, onMouseEnter, full }: SidebarListProps) => {
  return (
    <List
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      key={full?.toString()} disablePadding sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      overflowY: "auto",
    }}>
      <Toolbar />
      {appRoutes.map((route, index) => {
          if (!route.sidebarProps) return null;
          if (route.child) return <SidebarItemCollapse item={route} key={route.state} root full={full}/>
          return <SidebarItem key={route.state} item={route} root full={full}/>
        }
      )}
    </List>
  )
}

const Sidebar = () => {
  const currentRoute = useCurrentRoute();
  const routeState = currentRoute?.state;
  const sidebarOpen = useAtomValue(sidebarAtom);
  const setActiveSidebarItem = useSetAtom(sidebarItemAtom);
  const [openTempoDrawer, setOpenTempoDrawer] = useState(false);
  const full = openTempoDrawer || sidebarOpen || false;
  
  useEffect(() => {
    setActiveSidebarItem(routeState || "");
  }, [routeState]);
  
  useEffect(() => {
    setActiveSidebarItem("");
  },[sidebarOpen, openTempoDrawer]);

  return (
    <Box sx={{
      whiteSpace: 'nowrap',
      boxSizing: "border-box",
      color: themeConfig.sidebar.color,
      fontStyle: "normal",
      fontWeight: "medium",
      fontSize: "16px",
      lineHeight: "20px",
      position: "relative"
    }}>
      <MenuButton />
      {openTempoDrawer && <MuiDrawer
        anchor="left"
        hideBackdrop
        open={openTempoDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            background: themeConfig.sidebar.bg,
            width: themeConfig.width.sidebar.full,
          }
        }}
      >
        <SidebarList onMouseLeave={() => !sidebarOpen && setOpenTempoDrawer(false)} full/>
      </MuiDrawer>}
      {openTempoDrawer && <Box sx={{width: "80px", height: "100vh"}}/>}
      {!openTempoDrawer && <Drawer
        variant="permanent"
        open={sidebarOpen}
      >
      <SidebarList onMouseEnter={() => !sidebarOpen && setOpenTempoDrawer(true)} full={full} />
      </Drawer>
      }
    </Box>
  );
};

export default Sidebar;
