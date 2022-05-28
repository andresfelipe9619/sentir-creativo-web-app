import { useLocation } from "react-router-dom";
import { DashboardRoutes } from "../../router/router.config";

export default function useDashboard() {
  const location = useLocation();

  const dashboardItem = DashboardRoutes.find(
    (route) => route.path === location.pathname
  );

  return dashboardItem;
}
