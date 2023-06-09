import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />
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
