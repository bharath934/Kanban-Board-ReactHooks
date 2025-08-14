import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { Board } from './components/Board';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Board />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;