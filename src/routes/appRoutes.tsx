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


const generateRoute = (root: string, label: string) => {
  const path = (root + '/' + label).replaceAll(" ", "-").toLowerCase();
  return {
  path,
  element: <GenericPage />,
  state: path.replaceAll('/',' ').trim().replaceAll(' ', '.'),
  sidebarProps: {
    displayText: label
  },
}}

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
        ...generateRoute("/reports", "Applicant"),
        child: [
          generateRoute("/reports/applicant", "Open deals"),
          generateRoute("/reports/applicant", "Closed deals"),
          generateRoute("/reports/applicant", "Limits"),
          generateRoute("/reports/applicant", "Expiry Dates"),
          generateRoute("/reports/applicant", "In Work"),
          generateRoute("/reports/applicant", "Business Performance"),
          generateRoute("/reports/applicant", "Commissions & Fees"),
        ]
      },
      {
        ...generateRoute("/reports", "Beneficiary"),
        child: [
          generateRoute("/reports/beneficiary", "In Work"),
          generateRoute("/reports/beneficiary", "Expiry Dates"),
          generateRoute("/reports/beneficiary", "Open deals"),
        ]
      },
      {
        ...generateRoute("/reports", "Issuer"),
        child: [
          generateRoute("/reports/issuer", "In Work"),
          generateRoute("/reports/issuer", "Limits"),
          generateRoute("/reports/issuer", "Deals Via RIVO"),
          generateRoute("/reports/issuer", "Commissions & Fees"),
        ]
      },
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
    child: [
      {
        ...generateRoute("/administrator", "Application Settings"),
        child: [
          generateRoute("/administrator/Application settings", "Branding"),
          generateRoute("/administrator/Application settings", "Organization Profile"),
          generateRoute("/administrator/Application settings", "Limits"),
          generateRoute("/administrator/Application settings", "Currencies"),
          generateRoute("/administrator/Application settings", "My Customized Fields"),
        ]
      },
      {
        ...generateRoute("/administrator", "Business Settings"),
        child: [
          generateRoute("/administrator/Business Settings", "My Banks"),
          generateRoute("/administrator/Business Settings", "My Parties"),
          generateRoute("/administrator/Business Settings", "My Subscription Plan"),
          generateRoute("/administrator/Business Settings", "Organization Structure"),
          generateRoute("/administrator/Business Settings", "Audit Logs"),
        ]
      },
    ]
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
      generateRoute("/profile", "My Profile"),
      generateRoute("/profile", "Notification Settings"),
      generateRoute("/profile", "About"),
      generateRoute("/profile", "Logout"),
    ]
  },
];

export default appRoutes;
