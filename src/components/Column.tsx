import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Column as ColumnType, Task as TaskType } from '../types';
import { useTasks } from '../context/TaskContext';
import { Task } from './Task';
import { TaskModal } from './TaskModal';

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}

export function Column({ column, tasks }: ColumnProps) {
  const { dispatch } = useTasks();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = e.dataTransfer.getData('text/plain');
    dispatch({
      type: 'MOVE_TASK',
      payload: { taskId, newStatus: column.id }
    });
  };

  const handleDeleteColumn = () => {
    if (tasks.length > 0) {
      if (!window.confirm(`This will delete the column and all ${tasks.length} tasks in it. Are you sure?`)) {
        return;
      }
    }
    dispatch({ type: 'DELETE_COLUMN', payload: column.id });
  };

  const isDefaultColumn = ['todo', 'in-progress', 'done'].includes(column.id);

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${column.color} rounded-lg p-4 min-h-[600px] transition-all duration-200
                   ${isDragOver ? 'ring-2 ring-blue-500 ring-opacity-50 scale-105' : ''}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">
              {column.title}
            </h2>
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 
                           text-xs px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 
                       dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-700 
                       rounded-md transition-all duration-200"
              title="Add task"
            >
              <Plus className="w-4 h-4" />
            </button>
            {!isDefaultColumn && (
              <button
                onClick={handleDeleteColumn}
                className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 
                         dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-700 
                         rounded-md transition-all duration-200"
                title="Delete column"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="mb-2">No tasks yet</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                         dark:hover:text-blue-300 transition-colors"
              >
                Add your first task
              </button>
            </div>
          )}
        </div>
      </div>

      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        columnId={column.id}
      />
    </>
  );
}