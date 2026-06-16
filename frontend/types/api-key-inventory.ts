export interface ApiKeyInventory {
  id: number;
  name: string;
  projectName: string;
  createdAt: string;
  lastUsedAt: string | null;
}