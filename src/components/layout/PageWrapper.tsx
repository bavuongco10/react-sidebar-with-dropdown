import {ReactElement} from "react";
import {Typography} from "@mui/material";

type Props = {
  state: string,
  children: ReactElement
};

const PageWrapper = ({ state, children }: Props) => {
  return (
    <>
      <Typography variant="h1">{state}</Typography>
      {children}
    </>
  );
};

export default PageWrapper;
