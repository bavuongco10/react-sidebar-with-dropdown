import {Drawer as MuiDrawer, List, Stack, Box, Toolbar} from "@mui/material";
import assets from "../../../assets";
import appRoutes from "../../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import {useEffect, useState} from "react";
import {useAtomValue} from "jotai";
import {routeAtom} from "../../../atom/routeAtom";
import {sideBarAtom} from "../../../atom/sidebarAtom";
import {styled, Theme, CSSObject} from '@mui/material/styles';
import { ListSubheader } from '@mui/material';
import themeConfig from "../themeConfig";

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

const Sidebar = () => {
  const routeState = useAtomValue(routeAtom);
  const open = useAtomValue(sideBarAtom);
  const [activeItem, setActiveItem] = useState("");
  
  const [openTempoDrawer, setOpenTempoDrawer] = useState(false);
  
  useEffect(() => {
    setActiveItem(routeState);
  }, [routeState]);
  
  useEffect(() => {
    setActiveItem("");
  },[open, openTempoDrawer]);
  
  return (
    <Box sx={{
      whiteSpace: 'nowrap',
      boxSizing: "border-box",
      color: themeConfig.sidebar.color,
      fontStyle: "normal",
      fontWeight: "medium",
      fontSize: "16px",
      lineHeight: "20px",
    }}>
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
        <List
          onMouseLeave={() => !open && setOpenTempoDrawer(false)}
          key={open?.toString()} disablePadding sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          overflowY: "auto"
        }}>
          <ListSubheader>
            <Toolbar sx={{marginBottom: "1rem"}}>
              <Stack
                sx={{width: "100%"}}
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <img src={assets.images.logo} style={{height: "44px", background: "rgb(53,121,199)"}}/>
                {open && <img src={assets.images.text} style={{height: "44px" }}/>}
              </Stack>
            </Toolbar>
          </ListSubheader>
          {appRoutes.map((route, index) => {
              if (!route.sidebarProps) return null;
              if (route.child) return <SidebarItemCollapse item={route} key={route.state} root
                                                           setActiveItem={setActiveItem}
                                                           activeItem={activeItem}/>
              return <SidebarItem key={route.state} item={route} root setActiveItem={setActiveItem}
                                  activeItem={activeItem}
              />
            }
          )}
        </List>
      </MuiDrawer>}
      {openTempoDrawer && <Box sx={{width: "80px", height: "100vh"}}/>}
      {!openTempoDrawer && <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => !open && setOpenTempoDrawer(true)}
      >
        <List
          key={open?.toString()} disablePadding sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          overflowY: "auto"
        }}>
          <ListSubheader>
            <Toolbar sx={{marginBottom: "1rem"}}>
              <Stack
                sx={{width: "100%"}}
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <img src={assets.images.logo} style={{height: "44px", background: "rgb(53,121,199)"}}/>
                {open && <img src={assets.images.text} style={{height: "44px" }}/>}
              </Stack>
            </Toolbar>
          </ListSubheader>
          {appRoutes.map((route, index) => {
              if (!route.sidebarProps) return null;
              if (route.child) return <SidebarItemCollapse item={route} key={route.state} root
                                                           setActiveItem={setActiveItem}
                                                           activeItem={activeItem} compact={!open}/>
              return <SidebarItem key={route.state} item={route} root setActiveItem={setActiveItem}
                                  activeItem={activeItem}
                                  compact={!open}/>
            }
          )}
        </List>
      </Drawer>
      }
    </Box>
  );
};

export default Sidebar;
