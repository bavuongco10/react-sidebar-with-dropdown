import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../NavigationBar/Sidebar";
import Topbar from "../NavigationBar/Topbar";
import assets from "../../assets";
import {useAtom} from "jotai";
import {sidebarAtom} from "../NavigationBar/state/sidebar";
import IconButton from '@mui/material/IconButton';

const MenuButton = () => {
  const [sidebarOpen, toggleSidebar] = useAtom(sidebarAtom);
  
  return (
    <Box sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      bottom: "200px",
      left: (theme) => sidebarOpen ? "15.5rem": "60px",
      position: "absolute"
    }}>
      <IconButton onClick={() => toggleSidebar()}>
        <img src={sidebarOpen ? assets.images.menuIconLeft : assets.images.menuIconRight} alt="menu" style={{height: "28px", width: "28px"}}/>
      </IconButton>
    </Box>
  )
}


const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />
      <MenuButton />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          backgroundColor: "#F7F8FC"
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
