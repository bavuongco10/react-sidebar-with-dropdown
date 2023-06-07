import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";
import InstallationPage from "../pages/installation/InstallationPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HomeIcon from '@mui/icons-material/Home';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/installation",
    element: <InstallationPage />,
    state: "installation",
    sidebarProps: {
      displayText: "Home",
      icon: <HomeIcon />
    }
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "New",
      icon: <AddCircleOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index"
      },
      {
        path: "/dashboard/default",
        element: <DefaultPage />,
        state: "dashboard.default",
        sidebarProps: {
          displayText: "Export LC"
        },
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Import LC"
        }
      },
      {
        path: "/dashboard/saas",
        element: <SaasPage />,
        state: "dashboard.saas",
        sidebarProps: {
          displayText: "Outgoing Guarantee"
        }
      },
      {
        path: "/dashboard/saass",
        element: <SaasPage />,
        state: "dashboard.saass",
        sidebarProps: {
          displayText: "Incoming Guarantee"
        }
      },
      {
        path: "/dashboard/saasss",
        element: <SaasPage />,
        state: "dashboard.saasss",
        sidebarProps: {
          displayText: "Standby LC"
        }
      }
    ]
  },
  {
    path: "/component",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Reports",
      icon: <BarChartOutlinedIcon />
    },
    child: [
      {
        path: "/component/alert",
        element: <AlertPage />,
        state: "component.alert",
        sidebarProps: {
          displayText: "Usage Metrics Report"
        },
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Applicant"
        },
        child: [
          {
            path: "/component/button/1",
            element: <AlertPage />,
            state: "component.button.1",
            sidebarProps: {
              displayText: "Open deals"
            },
          },
          {
            path: "/component/button/2",
            element: <AlertPage />,
            state: "component.button.2",
            sidebarProps: {
              displayText: "Closed deals"
            },
          },
        ]
      }
    ]
  },
  {
    path: "/documentation",
    element: <DocumentationPage />,
    state: "documentation",
    sidebarProps: {
      displayText: "Notifications",
      icon: <NotificationsActiveIcon />
    },
    type: "popup"
  },
  {
    path: "/changelog",
    element: <ChangelogPage />,
    state: "changelog",
    sidebarProps: {
      displayText: "Administrator",
      icon: <SettingsIcon />
    },
  },
  {
    path: "/component",
    element: <ComponentPageLayout />,
    state: "profile",
    stickToBottom: true,
    sidebarProps: {
      displayText: "Releaser",
      icon: <PersonIcon />
    },
    child: [
      {
        path: "/component/alert",
        element: <AlertPage />,
        state: "profile.alert",
        sidebarProps: {
          displayText: "Alert"
        },
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "profile.button",
        sidebarProps: {
          displayText: "Button"
        }
      }
    ]
  },
];

export default appRoutes;
