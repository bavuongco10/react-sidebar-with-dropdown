import {ReactElement, useEffect} from "react";
import {Typography} from "@mui/material";
import {routeAtom} from "../../atom/atom";
import { useSetAtom } from "jotai";

type Props = {
  state: string,
  children: ReactElement
};

const PageWrapper = ({ state, children }: Props) => {
  const setRoute = useSetAtom(routeAtom)
  
  useEffect(() => {
    if (state) {
      setRoute(state);
    }
  }, [state, setRoute]);

  return (
    <>
      <Typography variant="h1">{state}</Typography>
      {children}
    </>
  );
};

export default PageWrapper;
