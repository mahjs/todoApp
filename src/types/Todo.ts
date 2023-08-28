// This is the main type for each todo item
export interface Todo {
  name: string;
  description: string;
  isComplete: boolean;
  createdAt: Date;
  lastUpdate?: Date;
}
