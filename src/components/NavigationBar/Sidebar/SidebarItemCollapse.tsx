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
import {useAtomValue} from "jotai";
import {sidebarAtom} from "../state/sidebar";

type Props = {
  item: RouteType;
  root?: boolean;
  textVariant?: string;
  unwrap?: boolean;
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

const SidebarItemCollapse = ({item, root, textVariant, unwrap}: Props) => {
  const [open, setOpen] = useState(unwrap);
  const [activeSidebarItem, setActiveSidebarItem] = useAtom(sidebarItemAtom);
  const currentRoute = useCurrentRoute();
  const routeState = currentRoute?.state;
  const sidebarOpen = useAtomValue(sidebarAtom);
  
  const handleOpen = (value: boolean) => !unwrap && setOpen(value);
  
  const handleClick = () => {
    handleOpen(!open);
    setActiveSidebarItem(item.state);
  }
  
  
  useEffect(() => {
    if (routeState?.includes(item.state)) {
      handleOpen(true);
    }
  }, [routeState, item.state]);
  
  useEffect(() => {
    if (activeSidebarItem !== item.state) {
      if (root && activeSidebarItem.includes(item.state)) return;
      if (activeSidebarItem.includes(item.state)) return;
      handleOpen(false);
    }
  }, [root, activeSidebarItem, item.state])
  
  if (!item.sidebarProps) return null;
  
  return (
    <ListItemButtonContainer bottom={item.stickToBottom} root={root}>
      {unwrap && <StyledListSubtitle content={item.sidebarProps.text}/>}
      {!unwrap && <StyledListItemButton
        onClick={handleClick}
        selected={routeState?.includes(item.state) && !open}
        active={routeState?.includes(item.state) && open}
        variant={root ? "primary" : "secondary"}
        collapsable
        textVariant={textVariant}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {sidebarOpen && <ListItemText
          disableTypography
          primary={item.sidebarProps.text}
        />}
        {sidebarOpen ? (open) ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/> : null}
      </StyledListItemButton>
      }
      {sidebarOpen && <Collapse in={open} timeout="auto">
        <List sx={{
          ...(unwrap ? {
            paddingTop: 0,
            paddingBottom: 0,
          } : {})
        }}>
          {item.child?.map((route, index) => {
            if (!route.sidebarProps) return null;
            if (route.child) return (<SidebarItemCollapse unwrap item={route} key={index}  textVariant="subTitle1"/>)
            return <SidebarItem item={route} key={index}  textVariant="subText1"/>
          })}
        </List>
      </Collapse>
      }
    </ListItemButtonContainer>
  );
};

export default SidebarItemCollapse;
