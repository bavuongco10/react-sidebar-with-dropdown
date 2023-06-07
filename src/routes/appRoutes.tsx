import { RouteType } from "./config";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HomeIcon from '@mui/icons-material/Home';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import {Outlet} from "react-router-dom";
import {Typography} from "@mui/material";

const GenericPage = () => <Typography variant="body1">Content: Generic page</Typography>

const appRoutes: RouteType[] = [
  {
    element: <GenericPage />,
    state: "home"
  },
  {
    path: "/home",
    element: <GenericPage/>,
    state: "home",
    sidebarProps: {
      displayText: "Home",
      icon: <HomeIcon />
    }
  },
  {
    path: "/new",
    element: <Outlet />,
    state: "new",
    sidebarProps: {
      displayText: "New",
      icon: <AddCircleOutlinedIcon />
    },
    child: [
      {
        path: "/new/exportlc",
        element: <GenericPage />,
        state: "new.exportlc",
        sidebarProps: {
          displayText: "Export LC"
        },
      },
      {
        path: "/new/importlc",
        element: <GenericPage />,
        state: "new.imporlc",
        sidebarProps: {
          displayText: "Import LC"
        },
      },
      {
        path: "/new/outgoingguarantee",
        element: <GenericPage />,
        state: "new.outgoingguarantee",
        sidebarProps: {
          displayText: "Outgoing Guarantee"
        }
      },
      {
        path: "/new/incomingguarantee",
        element: <GenericPage />,
        state: "new.incomingguarantee",
        sidebarProps: {
          displayText: "Incoming Guarantee"
        }
      },
      {
        path: "/new/standbylc",
        element: <GenericPage />,
        state: "new.standbylc",
        sidebarProps: {
          displayText: "Standby LC"
        }
      }
    ]
  },
  {
    path: "/reports",
    element: <Outlet />,
    state: "reports",
    sidebarProps: {
      displayText: "Reports",
      icon: <BarChartOutlinedIcon />
    },
    child: [
      {
        path: "/reports/usage",
        element: <GenericPage />,
        state: "reports.usage",
        sidebarProps: {
          displayText: "Usage Metrics Report"
        },
      },
      {
        path: "/reports/applicant",
        element: <GenericPage />,
        state: "reports.applicant",
        sidebarProps: {
          displayText: "Applicant"
        },
        child: [
          {
            path: "/reports/applicant/open",
            element: <GenericPage />,
            state: "reports.applicant.open",
            sidebarProps: {
              displayText: "Open deals"
            },
          },
          {
            path: "/reports/applicant/closed",
            element: <GenericPage />,
            state: "reports.applicant.closed",
            sidebarProps: {
              displayText: "Closed deals"
            },
          },
        ]
      }
    ]
  },
  {
    path: "/noticiations",
    element: <GenericPage />,
    state: "notifications",
    sidebarProps: {
      displayText: "Notifications",
      icon: <NotificationsActiveIcon />
    },
    type: "popup"
  },
  {
    path: "/administrator",
    element: <GenericPage />,
    state: "administrator",
    sidebarProps: {
      displayText: "Administrator",
      icon: <SettingsIcon />
    },
  },
  {
    path: "/profile",
    element: <Outlet />,
    state: "profile",
    stickToBottom: true,
    sidebarProps: {
      displayText: "Releaser",
      icon: <PersonIcon />
    },
    child: [
      {
        path: "/profile/alert",
        element: <GenericPage />,
        state: "profile.alert",
        sidebarProps: {
          displayText: "Alert"
        },
      },
      {
        path: "/profile/button",
        element: <GenericPage />,
        state: "profile.button",
        sidebarProps: {
          displayText: "Button"
        }
      }
    ]
  },
];

export default appRoutes;
