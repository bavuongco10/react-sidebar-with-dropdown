import {ReactNode} from "react";
import {Route} from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import appRoutes from "./appRoutes";
import {RouteType} from "./config";

const generateRoute = (routes: RouteType[]): ReactNode => {
  return routes.map((route) => {
    if (route.child) return (
      <Route
        path={route.path}
        key={route.state}
      >
        {route.child && (
          generateRoute(route.child)
        )}
      </Route>
    )
    
    return (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>
          {route.element}
        </PageWrapper>}
        key={`${route.state}-list`}
      />
    )
    
  });
}

export const routes: ReactNode = generateRoute(appRoutes);
