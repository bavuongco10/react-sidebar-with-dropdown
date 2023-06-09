import { AppBar, Toolbar, Typography } from "@mui/material";
import {sideBarAtom} from "../../atom/sidebarAtom";
import { useAtom } from "jotai";
import { HamburgerArrowAlt } from 'react-animated-burgers'
import themeConfig from "./themeConfig";

const Topbar = () => {
  const [open, toggle] = useAtom(sideBarAtom);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${open ? themeConfig.width.sidebar.full : themeConfig.width.sidebar.mini})`,
        boxShadow: "unset",
        backgroundColor: "#fff",
        color: "#000"
      }}
    >
      <Toolbar>
        <HamburgerArrowAlt
          buttonWidth={30}
          isActive={open}
          toggleButton={() => toggle()}
        />
        <Typography variant="h6">
          Top bar
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
