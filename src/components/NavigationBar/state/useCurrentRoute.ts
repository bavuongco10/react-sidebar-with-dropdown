import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {flattenedRoutes} from "../../../routes/appRoutes";
import {RouteType} from "../../../routes/types";

export const useCurrentRoute = () => {
  const [route, setRoute] = useState<RouteType>();
  const location = useLocation();
  
  useEffect(() => {
    setRoute(flattenedRoutes[location.pathname]);
  }, [location]);
  
  return route;
}
