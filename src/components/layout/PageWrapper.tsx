import {ReactElement, useEffect} from "react";
import {Typography} from "@mui/material";
import {routeAtom} from "../../atom/routeAtom";
import { useSetAtom } from "jotai";

type Props = {
  state: string,
  children: ReactElement
};

const PageWrapper = ({ state, children }: Props) => {
  const setRouteState = useSetAtom(routeAtom)
  useEffect(() => {
    if (state) setRouteState(state);
  }, [state, setRouteState]);

  return (
    <>
      <Typography variant="h1">{state}</Typography>
      {children}
    </>
  );
};

export default PageWrapper;
