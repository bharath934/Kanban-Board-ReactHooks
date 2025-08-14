export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

export interface TaskState {
  tasks: Task[];
  columns: Column[];
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt'> }
  | { type: 'EDIT_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { taskId: string; newStatus: string } }
  | { type: 'ADD_COLUMN'; payload: { title: string; color: string } }
  | { type: 'DELETE_COLUMN'; payload: string };

export interface DragItem {
  id: string;
  type: string;
}