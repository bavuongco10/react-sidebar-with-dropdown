import styled from '@emotion/styled';
import {variant} from 'styled-system';

export const ListItemButtonContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    margin: "2px 0",
  }
}, variant({
  prop: "bottom",
  variants: {
    true: {
      flexDirection: "column-reverse",
      marginTop: "auto"
    },
  }
}), variant({
  prop: "root",
  variants: {
    true: {
      margin: "0 0 1rem 0",
    },
  }
}));
