import {Box, Collapse, List, ListItemIcon, ListItemText} from "@mui/material";
import React, {useEffect, useState} from "react";
import {RouteType} from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import {useAtomValue} from "jotai";
import {routeAtom} from "../../atom/routeAtom";
import {StyledListItemButton} from "./StyledListItemButton";
import {ListItemButtonContainer} from "./ListItemButtonContainer";

type Props = {
  item: RouteType;
  root?: boolean;
  setActiveItem: (value: string) => void;
  activeItem: string;
  compact?: boolean;
  textVariant?: string;
  unwrap?: boolean;
};

const SidebarItemCollapse = ({item, root, setActiveItem, activeItem, compact, textVariant, unwrap}: Props) => {
  const [open, setOpen] = useState(unwrap);
  const appState = useAtomValue(routeAtom);
  
  const handleOpen = (value: boolean) => !unwrap && setOpen(value);
  
  const handleClick = () => {
    handleOpen(!open);
    setActiveItem(item.state);
  }
  
  
  useEffect(() => {
    if (appState.includes(item.state)) {
      handleOpen(true);
    }
  }, [appState, item.state]);
  
  useEffect(() => {
    if (activeItem !== item.state) {
      if (root && activeItem.includes(item.state)) return;
      if (activeItem.includes(item.state)) return;
      handleOpen(false);
    }
  }, [root, activeItem, item.state])
  
  if (!item.sidebarProps) return null;
  
  return (
    <ListItemButtonContainer bottom={item.stickToBottom} root={root}>
      {unwrap &&
        <Box sx={{
          margin: "0 12px",
          padding: "0.5rem 1rem",
          marginTop: "8px",
        }}>
          <ListItemText
          sx={{
            paddingLeft: "2.5rem",
            fontSize: "14px",
            fontWeight: "500",
            color: "#757575",
          }}
        >{item.sidebarProps.displayText}
        </ListItemText>
        </Box>}
      {!unwrap && <StyledListItemButton
        onClick={handleClick}
        selected={appState.includes(item.state) && !open}
        active={appState.includes(item.state) && open}
        variant={root ? "primary" : "secondary"}
        collapsable
        textVariant={textVariant}
      >
        <ListItemIcon>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {!compact && <ListItemText
          disableTypography
          primary={item.sidebarProps.displayText}
        />}
        {!compact ? (open) ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/> : null}
      </StyledListItemButton>
      }
      {!compact && <Collapse in={open} timeout="auto">
        <List sx={{
          ...(unwrap ? {
            paddingTop: 0,
            paddingBottom: 0,
          } : {})
        }}>
          {item.child?.map((route, index) => {
            if (!route.sidebarProps) return null;
            if (route.child) return <SidebarItemCollapse unwrap item={route} key={index} setActiveItem={setActiveItem}
                                                         activeItem={activeItem} textVariant="subTitle1"/>
            return <SidebarItem item={route} key={index} setActiveItem={setActiveItem} textVariant="subText1"/>
          })}
        </List>
      </Collapse>
      }
    </ListItemButtonContainer>
  );
};

export default SidebarItemCollapse;
