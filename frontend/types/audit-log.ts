export interface AuditLog {
  id: number;
  userEmail: string;
  projectName: string;
  action: string;
  details: string;
  createdAt: string;
}