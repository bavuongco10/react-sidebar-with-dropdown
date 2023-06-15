import {Box, Collapse, List, ListItemIcon, ListItemText} from "@mui/material";
import React, {useEffect, useState} from "react";
import {RouteType} from "../../../routes/types";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import {useAtom} from "jotai";
import {useCurrentRoute} from "../state/useCurrentRoute";
import {StyledListItemButton} from "./StyledListItemButton";
import {ListItemButtonContainer} from "./ListItemButtonContainer";
import {sidebarItemAtom} from "../state/sidebarItem";
import {activeSidebarItemLevel1Atom, activeSidebarItemLevel2Atom} from "../state/sidebar";

type Props = {
  item: RouteType;
  root?: boolean;
  textVariant?: string;
  unwrap?: boolean;
  full?: boolean;
};

const StyledListSubtitle = ({content}: { content?: string }) => (
  <Box sx={{
    margin: "0 12px",
    padding: "0.5rem 1rem",
    marginTop: "8px",
  }}>
    <ListItemText
      sx={{
        fontSize: "12px",
        paddingLeft: "2.5rem",
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "#757575",
      }}
      disableTypography
      primary={content}
    >
    </ListItemText>
  </Box>
)

const SidebarItemCollapse = ({item, root, textVariant, unwrap, full}: Props) => {
  const [open, setOpen] = useState(unwrap);
  const [activeSidebarItem, setActiveSidebarItem] = useAtom(sidebarItemAtom);
  const currentRoute = useCurrentRoute();
  const routeState = currentRoute?.state;
  
  const [level1, setItemLevel1] = useAtom(activeSidebarItemLevel1Atom);
  const [level2, setItemLevel2] = useAtom(activeSidebarItemLevel2Atom);
  
  const handleOpen = (value: boolean) => !unwrap && setOpen(value);
  
  const handleClick = () => {
    handleOpen(!open);
    setActiveSidebarItem(item.state);
  }
  
  useEffect(() => {
    if (routeState?.startsWith(item.state) && full) {
      handleOpen(true);
    }
  }, [routeState, item.state, full]);
  
  useEffect(() => {
    if(!full) setOpen(false);
  },[full]);
  
  useEffect(() => {
    if (activeSidebarItem === item.state) return
    if (root && activeSidebarItem.startsWith(item.state)) return;
    if (activeSidebarItem.startsWith(item.state)) return;
    handleOpen(false);
  }, [root, activeSidebarItem, item.state])
  
  if (!item.sidebarProps) return null;

  return (
    <ListItemButtonContainer bottom={item.stickToBottom} root={root}>
      {unwrap && <StyledListSubtitle content={item.sidebarProps.text} />}
      {!unwrap && <StyledListItemButton
        onClick={handleClick}
        selected={!open && level2.startsWith(item.state)}
        active={open && level2.startsWith(item.state)}
        variant={root ? "primary" : "secondary"}
        textVariant={textVariant}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {full && <ListItemText disableTypography primary={item.sidebarProps.text} />}
        {full ? (open) ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/> : null}
      </StyledListItemButton>
      }
      {full && <Collapse in={open} timeout="auto">
        <List sx={{
          ...(unwrap ? {
            paddingTop: 0,
            paddingBottom: 0,
          } : {})
        }}>
          {item.child?.map((route, index) => {
            if (!route.sidebarProps) return null;
            if (route.child) return (<SidebarItemCollapse unwrap item={route} key={index} textVariant="subTitle1" full={full}/>)
            return <SidebarItem item={route} key={index}  textVariant="subText1" full={full}/>
          })}
        </List>
      </Collapse>
      }
    </ListItemButtonContainer>
  );
};

export default SidebarItemCollapse;
