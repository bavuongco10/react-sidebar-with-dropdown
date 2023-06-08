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
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClickCompact = (event: React.MouseEvent<HTMLElement>) => {
    setActiveItem(item.state);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const openPopper = Boolean(anchorEl);
  
  
  
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const handleClickCompact2 = (event: React.MouseEvent<HTMLElement>) => {
    setActiveItem(item.state);
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };
  const openPopper2 = Boolean(anchorEl2);
  console.log(openPopper2)
  const popper2 = (
    <Popper open={openPopper2} anchorEl={anchorEl2} placement="right-start" sx={{
      left: "20px !important",
    }}>
      <Box sx={{
        padding: "24px",
        width: "282px",
        height: "330px",
        background: "#364BB5",
        boxShadow: "0px 2px 6px 2px rgba(167, 167, 167, 0.5)",
        borderRadius: "1rem"
      }}>
        <div style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "18px",
          lineHeight: "23px",
          display: "flex",
          alignItems: "center",
          color: "#FFFFFF"
        }}>
          <List sx={{ width: "100%"}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Box>
    </Popper>
  )
  
  const popper = (
    <Popper open={openPopper} anchorEl={anchorEl} placement="right-start" sx={{
      left: "20px !important",
    }}>
      <Box sx={{
        padding: "24px",
        width: "282px",
        height: "330px",
        background: "#364BB5",
        boxShadow: "0px 2px 6px 2px rgba(167, 167, 167, 0.5)",
        borderRadius: "1rem"
      }}>
        <div style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "18px",
          lineHeight: "23px",
          display: "flex",
          alignItems: "center",
          color: "#FFFFFF"
        }}>
          <List sx={{ width: "100%"}}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClickCompact2}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {compact && popper2}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Box>
    </Popper>
  )
  
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
        onClick={compact ? handleClickCompact : handleClick}
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
      {compact && popper}
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
