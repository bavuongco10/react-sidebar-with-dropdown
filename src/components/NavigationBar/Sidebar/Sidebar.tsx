import {Drawer as MuiDrawer, List, Box, Toolbar} from "@mui/material";
import {appRoutes} from "../../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import {useEffect, useRef, useState} from "react";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {useCurrentRoute} from "../state/useCurrentRoute";
import {styled, Theme, CSSObject} from '@mui/material/styles';
import themeConfig from "../themeConfig";
import {activeSidebarItemLevel1Atom, activeSidebarItemLevel2Atom, sidebarAtom} from "../state/sidebar";
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
  
  const [level1, setItemLevel1] = useAtom(activeSidebarItemLevel1Atom);
  const [level2, setItemLevel2] = useAtom(activeSidebarItemLevel2Atom);
  console.log({level1, level2});
  
  useEffect(() => {
    if(!routeState) return setItemLevel1("home");
 
    const parts = routeState.split(".");
    const [level1] = parts;
    setItemLevel1(level1);
    setItemLevel2(routeState);
    
  },[routeState])
  
  
  useEffect(() => {
    setActiveSidebarItem(routeState || "");
  }, [routeState]);
  
  useEffect(() => {
    setActiveSidebarItem("");
  },[sidebarOpen, openTempoDrawer]);
  
  const hoverTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const handleOpenTempoDrawer = () => {
    if(sidebarOpen) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenTempoDrawer(true)
    }, 400);
  }
  
  const handleCloseTempoDrawer = () => {
    if(hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenTempoDrawer(false)
  }
  
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
      {!openTempoDrawer && <MenuButton open={full} />}
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
        <SidebarList
          full
          onMouseLeave={handleCloseTempoDrawer}
        />
      </MuiDrawer>}
      {openTempoDrawer && <Box sx={{width: "80px", height: "100vh"}}/>}
      {!openTempoDrawer && <Drawer
        variant="permanent"
        open={sidebarOpen}
      >
      <SidebarList
        full={full}
        onMouseLeave={handleCloseTempoDrawer}
        onMouseEnter={handleOpenTempoDrawer}
      />
      </Drawer>
      }
    </Box>
  );
};

export default Sidebar;
