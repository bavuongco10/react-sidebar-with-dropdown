import {ReactElement, ReactNode} from "react";

export type RouteType = {
  element: ReactElement,
  state: string,
  index?: boolean,
  path?: string,
  stickToBottom?: boolean,
  type?: string,
  child?: RouteType[],
  sidebarProps?: {
    displayText: string,
    icon?: ReactNode;
  };
};
