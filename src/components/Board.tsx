import React, { useState, useMemo } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import { Column } from './Column';
import { SearchBar } from './SearchBar';
import { ColumnModal } from './ColumnModal';

export function Board() {
  const { state } = useTasks();
  const { isDark, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    if (!searchTerm) return state.tasks;
    
    return state.tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [state.tasks, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
                   dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Kanban Board
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize your tasks with drag & drop functionality
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsColumnModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 
                       focus:ring-blue-500"
            >
              <Plus className="w-4 h-4" />
              Add Column
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg
                       transition-all duration-200 text-gray-600 dark:text-gray-400"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={filteredTasks.filter(task => task.status === column.id)}
            />
          ))}
        </div>

        {state.columns.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No columns yet</p>
            <button
              onClick={() => setIsColumnModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Your First Column
            </button>
          </div>
        )}
      </div>

      <ColumnModal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
      />
    </div>
  );
}