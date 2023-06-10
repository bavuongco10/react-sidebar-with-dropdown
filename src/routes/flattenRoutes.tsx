import {RouteType} from "./types";

type FlattenedRoutes = Record<string, RouteType>;

export function flattenRoutes(routes: RouteType[]): FlattenedRoutes {
  const flattenedRoutes: FlattenedRoutes = {};
  
  function processRoute(route: RouteType) {
    if (route.state) {
      flattenedRoutes[route.state] = route;
    }
    
    if (route.child) {
      route.child.forEach(processRoute);
    }
  }
  
  routes.forEach(processRoute);
  
  return flattenedRoutes;
}

