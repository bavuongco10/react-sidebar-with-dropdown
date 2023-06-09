import {Drawer as MuiDrawer, List, Stack, Box, Toolbar} from "@mui/material";
import assets from "../../assets";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import {useEffect, useState} from "react";
import {useAtomValue} from "jotai";
import {routeAtom} from "../../atom/routeAtom";
import {sideBarAtom} from "../../atom/sidebarAtom";
import {styled, Theme, CSSObject} from '@mui/material/styles';
import { ListSubheader } from '@mui/material';

const openedMixin = (theme: Theme): CSSObject => ({
  borderRight: "0px",
  width: sizeConfigs.sidebar.width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  borderRight: "0px",
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: sizeConfigs.sidebar.mini,
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: sizeConfigs.sidebar.width,
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
  const appState = useAtomValue(routeAtom);
  const open = useAtomValue(sideBarAtom);
  const [activeItem, setActiveItem] = useState("");
  
  const [openTempoDrawer, setOpenTempoDrawer] = useState(false);
  
  useEffect(() => {
    setActiveItem(appState);
  }, [appState]);
  
  useEffect(() => {
    setActiveItem("");
  },[open, openTempoDrawer]);
  
  return (
    <Box sx={{
      whiteSpace: 'nowrap',
      boxSizing: "border-box",
      color: "#102347",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "20px",
    }}>
      {openTempoDrawer && <MuiDrawer
        anchor="left"
        hideBackdrop
        open={openTempoDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: sizeConfigs.sidebar.width,
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
