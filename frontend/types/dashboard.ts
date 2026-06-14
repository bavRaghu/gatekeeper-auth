export interface Activity {
  action: string;
  details: string;
  timestamp: string;
}

export interface DashboardResponse {
  projects: number;
  apiKeys: number;
  auditLogs: number;
  recentActivity: Activity[];
}