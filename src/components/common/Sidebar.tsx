import {Drawer as MuiDrawer, List, Stack,  Box, Toolbar} from "@mui/material";
import assets from "../../assets";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import {useEffect, useState} from "react";
import {useAtomValue, useAtom} from "jotai";
import {routeAtom} from "../../atom/routeAtom";
import {sideBarAtom} from "../../atom/sidebarAtom";
import {styled, Theme, CSSObject} from '@mui/material/styles';

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
    whiteSpace: 'nowrap',
    flexShrink: 0,
    boxSizing: "border-box",
    color: "#102347",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "20px",
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
  
  return (
    <div>
      {openTempoDrawer && <MuiDrawer
        anchor="left"
        open={openTempoDrawer}
      >
        <List
          onMouseLeave={() => setOpenTempoDrawer(false)}
          key={open?.toString()} disablePadding sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}>
          <Toolbar sx={{marginBottom: "20px"}}>
            <Stack
              sx={{width: "100%"}}
              direction="row"
              justifyContent="center"
            >
              <img src={assets.images.logo} style={{height: "44px", background: "#364BB5"}}/>
            </Stack>
          </Toolbar>
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
      {openTempoDrawer && <Box sx={{ width: "80px" , height: "100vh"}} />}
      {!openTempoDrawer && <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => !open && setOpenTempoDrawer(true)}
      >
        <List
          key={open?.toString()} disablePadding sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}>
          <Toolbar sx={{marginBottom: "20px"}}>
            <Stack
              sx={{width: "100%"}}
              direction="row"
              justifyContent="center"
            >
              <img src={assets.images.logo} style={{height: "44px", background: "#364BB5"}}/>
            </Stack>
          </Toolbar>
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
    </div>
  );
};

export default Sidebar;
