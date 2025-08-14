import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ColumnModal({ isOpen, onClose }: ColumnModalProps) {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('bg-gray-100 dark:bg-gray-800');

  const colorOptions = [
    { value: 'bg-gray-100 dark:bg-gray-800', label: 'Gray' },
    { value: 'bg-blue-100 dark:bg-blue-900', label: 'Blue' },
    { value: 'bg-green-100 dark:bg-green-900', label: 'Green' },
    { value: 'bg-yellow-100 dark:bg-yellow-900', label: 'Yellow' },
    { value: 'bg-red-100 dark:bg-red-900', label: 'Red' },
    { value: 'bg-purple-100 dark:bg-purple-900', label: 'Purple' },
    { value: 'bg-pink-100 dark:bg-pink-900', label: 'Pink' },
    { value: 'bg-indigo-100 dark:bg-indigo-900', label: 'Indigo' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    dispatch({
      type: 'ADD_COLUMN',
      payload: { title: title.trim(), color }
    });

    setTitle('');
    setColor('bg-gray-100 dark:bg-gray-800');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Add New Column
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Column Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter column title"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Column Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className={`p-3 rounded-md border-2 transition-colors ${option.value}
                           ${color === option.value ? 'border-blue-500' : 'border-gray-200 dark:border-gray-600'}`}
                >
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                       rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Column
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}