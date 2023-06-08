import {Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Popper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {RouteType} from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import {useAtomValue} from "jotai";
import {routeAtom} from "../../atom/routeAtom";
import {StyledListItemButton} from "./StyledListItemButton";
import {ListItemButtonContainer} from "./ListItemButtonContainer";
import ListItem from '@mui/material/ListItem';

type Props = {
  item: RouteType;
  root?: boolean;
  setActiveItem: (value: string) => void;
  activeItem: string;
  compact?: boolean;
};

const SidebarItemCollapse = ({item, root, setActiveItem, activeItem, compact }: Props) => {
  const [open, setOpen] = useState(false);
  const appState = useAtomValue(routeAtom);

  const handleClick = () => {
    setOpen(!open);
    setActiveItem(item.state);
  }
  
  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item.state]);

  useEffect(() => {
    if(activeItem !== item.state) {
      if(root && activeItem.includes(item.state)) return;
      if(activeItem.includes(item.state)) return;
      setOpen(false);
    }
  },[root, activeItem, item.state])

  if (!item.sidebarProps) return null;
  
  return (
    <ListItemButtonContainer bottom={item.stickToBottom} root={root}>
      <StyledListItemButton
        onClick={handleClick}
        selected={appState.includes(item.state) && !open}
        active={appState.includes(item.state) && open}
        variant={root ? "primary" : "secondary"}
        collapsable
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
      {!compact && <Collapse in={open} timeout="auto">
        <List>
          {item.child?.map((route, index) => {
            if (!route.sidebarProps) return null;
            if (route.child) return <SidebarItemCollapse item={route} key={index} setActiveItem={setActiveItem} activeItem={activeItem} />
            return <SidebarItem item={route} key={index} setActiveItem={setActiveItem}/>
          })}
        </List>
      </Collapse>
      }
    </ListItemButtonContainer>
  );
};

export default SidebarItemCollapse;
