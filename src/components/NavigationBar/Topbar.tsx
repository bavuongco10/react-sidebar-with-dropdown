import { AppBar, Box, Toolbar } from "@mui/material";
import assets from "../../assets";
import {useAtomValue} from "jotai";
import {sidebarAtom} from "./state/sidebar";
import themeConfig from "./themeConfig";

const Topbar = () => {
  const sidebarOpen = useAtomValue(sidebarAtom);
  
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "unset",
        backgroundColor: "#fff",
        color: "#000"
      }}
    >
      <Toolbar sx={{
        width: sidebarOpen ? themeConfig.width.sidebar.full : themeConfig.width.sidebar.mini
      }}>
        <Box>
          <img src={assets.images.logo} style={{height: "44px", background: "rgb(53,121,199)", marginRight: "4px"}}/>
          <img src={assets.images.text} style={{height: "44px" }}/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
