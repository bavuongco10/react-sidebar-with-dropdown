import { AppBar, Toolbar, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { HamburgerArrowAlt } from 'react-animated-burgers'
import themeConfig from "./themeConfig";
import {sidebarAtom} from "./state/sidebar";

const Topbar = () => {
  const [sidebarOpen, toggleSidebar] = useAtom(sidebarAtom);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sidebarOpen ? themeConfig.width.sidebar.full : themeConfig.width.sidebar.mini})`,
        boxShadow: "unset",
        backgroundColor: "#fff",
        color: "#000"
      }}
    >
      <Toolbar>
        <HamburgerArrowAlt
          buttonWidth={30}
          isActive={sidebarOpen}
          toggleButton={() => toggleSidebar()}
        />
        <Typography variant="h6">
          Top bar
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
