import {useSetAtom} from "jotai";
import {activeSidebarCollapseAtom, reCalAtom, sidebarAtom} from "../state/sidebar";
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import assets from "../../../assets";
import {useAtom} from "jotai";

const MenuButton = ({ open }: { open?: boolean }) => {
  const toggleSidebar = useSetAtom(sidebarAtom);
  const [reCal, setReCal] = useAtom(reCalAtom);
  
  const handleToggleMenu = () => {
    toggleSidebar();
  }
  
  return (
    <Box sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      bottom: "200px",
      right: "-20px",
      position: "absolute"
    }}>
      <IconButton onClick={handleToggleMenu}>
        <img src={open ? assets.images.menuIconLeft : assets.images.menuIconRight} alt="menu" style={{height: "28px", width: "28px"}}/>
      </IconButton>
    </Box>
  )
}

export default MenuButton;
