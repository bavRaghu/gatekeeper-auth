export interface ProjectMember {
  id: number;
  email: string;
  role: string;
}

export interface ApiKey {
  id: number;
  name: string;
}

export interface Activity {
  action: string;
  details: string;
  timestamp: string;
}

export interface ProjectDetails {
  id: number;
  name: string;
  ownerEmail: string;

  members: ProjectMember[];

  apiKeys: ApiKey[];

  recentActivity: Activity[];
}