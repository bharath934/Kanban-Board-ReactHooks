import React, { useState } from 'react';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { Task as TaskType } from '../types';
import { useTasks } from '../context/TaskContext';
import { TaskModal } from './TaskModal';

interface TaskProps {
  task: TaskType;
}

export function Task({ task }: TaskProps) {
  const { dispatch } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'border-l-gray-300 bg-white dark:bg-gray-800';
    }
  };

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`p-4 border-l-4 rounded-lg shadow-sm cursor-move transition-all duration-200
                   hover:shadow-md hover:scale-105 ${getPriorityColor(task.priority)}
                   ${isDragging ? 'opacity-50 rotate-3' : ''}`}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
            {task.title}
          </h3>
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                       transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 
                       transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs">
          <span className={`px-2 py-1 rounded-full text-white ${
            task.priority === 'high' ? 'bg-red-500' :
            task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        columnId={task.status}
      />
    </>
  );
}