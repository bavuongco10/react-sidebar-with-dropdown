import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import {sideBarAtom} from "../../atom/sidebarAtom";
import { useAtom } from "jotai";
import { HamburgerArrowAlt } from 'react-animated-burgers'

const Topbar = () => {
  const [open, toggle] = useAtom(sideBarAtom);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${open ? sizeConfigs.sidebar.width : sizeConfigs.sidebar.mini})`,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
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
