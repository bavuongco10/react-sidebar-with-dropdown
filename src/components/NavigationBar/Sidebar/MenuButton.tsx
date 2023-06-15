import {useAtom} from "jotai";
import {sidebarAtom} from "../state/sidebar";
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import assets from "../../../assets";

const MenuButton = () => {
  const [sidebarOpen, toggleSidebar] = useAtom(sidebarAtom);
  
  return (
    <Box sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      bottom: "200px",
      right: "-20px",
      position: "absolute"
    }}>
      <IconButton onClick={() => toggleSidebar()}>
        <img src={sidebarOpen ? assets.images.menuIconLeft : assets.images.menuIconRight} alt="menu" style={{height: "28px", width: "28px"}}/>
      </IconButton>
    </Box>
  )
}

export default MenuButton;
