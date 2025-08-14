import { TaskState, TaskAction } from '../types';

export const initialTaskState: TaskState = {
  tasks: [
    {
      id: '1',
      title: 'Design Homepage',
      description: 'Create wireframes and mockups for the new homepage layout',
      status: 'todo',
      priority: 'high',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Setup Database',
      description: 'Configure PostgreSQL database with initial schema',
      status: 'in-progress',
      priority: 'high',
      createdAt: new Date('2024-01-16')
    },
    {
      id: '3',
      title: 'Write Unit Tests',
      description: 'Add comprehensive test coverage for user authentication',
      status: 'done',
      priority: 'medium',
      createdAt: new Date('2024-01-14')
    },
    {
      id: '4',
      title: 'Code Review',
      description: 'Review pull requests from team members',
      status: 'todo',
      priority: 'low',
      createdAt: new Date('2024-01-17')
    }
  ],
  columns: [
    { id: 'todo', title: 'To Do', color: 'bg-slate-100 dark:bg-slate-800' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900' }
  ]
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: Date.now().toString(),
            createdAt: new Date()
          }
        ]
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus }
            : task
        )
      };

    case 'ADD_COLUMN':
      return {
        ...state,
        columns: [
          ...state.columns,
          {
            id: Date.now().toString(),
            title: action.payload.title,
            color: action.payload.color
          }
        ]
      };

    case 'DELETE_COLUMN':
      return {
        ...state,
        columns: state.columns.filter(column => column.id !== action.payload),
        tasks: state.tasks.filter(task => task.status !== action.payload)
      };

    default:
      return state;
  }
}