import styled from '@emotion/styled';
import {variant} from 'styled-system';

export const ListItemButtonContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
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
      marginBottom: "1rem",
    },
  }
}));
