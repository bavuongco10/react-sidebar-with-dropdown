import themeConfig from "../themeConfig";
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
      backgroundColor: themeConfig.sidebar.selected.bg,
      color: themeConfig.sidebar.selected.text,
      "& .MuiListItemIcon-root": {
        color: themeConfig.sidebar.selected.icon
      }
    },
    "&:hover": {
      color: themeConfig.sidebar.hover.text,
      "& .MuiListItemIcon-root": {
        color: themeConfig.sidebar.hover.icon
      }
    },
    "& .MuiListItemIcon-root": {
      minWidth: "2.5rem",
      color: themeConfig.sidebar.icon,
    },
    // @ts-ignore
    ...(props.active ? {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: themeConfig.sidebar.hover.text,
      "& .MuiListItemIcon-root": {
        minWidth: "2.5rem",
        color: themeConfig.sidebar.hover.icon
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
      fontWeight: "normal"
    },
    subTitle1: {
      color: "#757575",
      marginTop: "8px"
  
}}})
);
