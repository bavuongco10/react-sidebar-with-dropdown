import {Drawer, List, Stack, Toolbar} from "@mui/material";
import assets from "../../assets";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import {useEffect, useState} from "react";
import {useAtomValue} from "jotai";
import {routeAtom} from "../../atom/routeAtom";

const Sidebar = () => {
  const appState = useAtomValue(routeAtom);
  const [activeItem, setActiveItem] = useState("");
  
  useEffect(() => {
    setActiveItem(appState);
  },[appState])
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: "white",
          color: "#102347",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "20px",
        }
      }}
    >
      <List disablePadding sx={{
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
            <img src={assets.images.logo} style={{ height: "44px", background: "#364BB5"}}/>
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => {
          if(!route.sidebarProps) return null;
          if(route.child) return <SidebarItemCollapse item={route} key={route.state} root setActiveItem={setActiveItem} activeItem={activeItem} />
          return <SidebarItem key={route.state} item={route} root setActiveItem={setActiveItem} activeItem={activeItem}/>
          }
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
