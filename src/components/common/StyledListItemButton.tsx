import colorConfigs from "../colorConfigs";
import {ListItemButton} from "@mui/material";
import styled from '@emotion/styled';
import { variant } from 'styled-system';

export const StyledListItemButton = styled(ListItemButton)((props) => {
  return {
    height: "3.5rem",
    borderRadius: "0.5rem",
    margin: "0 0.75rem",
    paddingLeft: "1rem",
    "&.Mui-selected": {
      backgroundColor: colorConfigs.sidebar.selected.bg,
      color: colorConfigs.sidebar.selected.text,
      "& .MuiListItemIcon-root": {
        color: colorConfigs.sidebar.selected.icon
      }
    },
    "&:hover": {
      color: colorConfigs.sidebar.hover.text,
      "& .MuiListItemIcon-root": {
        color: colorConfigs.sidebar.hover.icon
      }
    },
    "& .MuiListItemIcon-root": {
      minWidth: "2.5rem",
      color: colorConfigs.sidebar.icon,
    },
    // @ts-ignore
    ...(props.active ? {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: colorConfigs.sidebar.hover.text,
      "& .MuiListItemIcon-root": {
        minWidth: "2.5rem",
        color: colorConfigs.sidebar.hover.icon
      }
    } : {})
  }
}, variant({
  variants: {
    primary: {
      height: "3.5rem",
    },
    secondary: {
      height: "2.5rem",
    },
  }
}),variant({
  prop: "textVariant",
  variants: {
    subText1: {
      fontSize: "14px",
      fontWeight: "400"
    },
    subTitle1: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#90949C",
      marginTop: "8px"
  
}}})
);
