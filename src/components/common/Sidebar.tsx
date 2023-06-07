import {Drawer, List, Stack, Toolbar} from "@mui/material";
import assets from "../../assets";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const ICON = require("../../assets/images/rivo-icon.png");
const LOGO = require("../../assets/images/rivo.png");

const Sidebar = () => {
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
            {/*<img src={ICON}/>*/}
            {/*<img src={LOGO}/>*/}
            <img src={assets.images.logo} style={{ height: "44px", background: "#364BB5"}}/>
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => {
          if(!route.sidebarProps) return null;
          if(route.child) return <SidebarItemCollapse item={route} key={index} root/>
          return <SidebarItem item={route} key={index} root/>
          }
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
