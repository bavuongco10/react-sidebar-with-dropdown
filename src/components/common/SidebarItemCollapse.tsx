import {Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
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
};

const SidebarItemCollapse = ({item, root, setActiveItem, activeItem }: Props) => {
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
    if(root && !activeItem.includes(item.state)) {
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
        <ListItemText
          disableTypography
          primary={item.sidebarProps.displayText}
        />
        {(open) ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/>}
      </StyledListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item.child?.map((route, index) => {
            if (!route.sidebarProps) return null;
            if (route.child) return <SidebarItemCollapse item={route} key={index} setActiveItem={setActiveItem} activeItem={activeItem} />
            return <SidebarItem item={route} key={index} setActiveItem={setActiveItem}/>
          })}
        </List>
      </Collapse>
    </ListItemButtonContainer>
  );
};

export default SidebarItemCollapse;
