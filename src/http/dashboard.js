import { api } from "./api";

export default function dashboardApi() {
    return {
        getDashboardData: async () =>
            api().get('dashboard/stats'),
    }
}
