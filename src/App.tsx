import { useState, useEffect } from 'react'
import './App.css'

import 'react-calendar-heatmap/dist/styles.css';
import HeatMap from './HeatMap/heat-map';
import TodoListForm from './ToDoListForm/todolistform';
import TodoList from './TodoList/todo';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  completedHistory?: string[]; // Array of ISO date strings (YYYY-MM-DD)
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: String(Date.now()),
      text,
      completed: false,
      completedHistory: [] // Initialize with empty history
    }
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) => prevTasks.map(task => {
      if (task.id === id) {
        const isCompleted = !task.completed;
        const today = new Date().toISOString().split('T')[0];
        let newHistory = task.completedHistory || [];

        if (isCompleted) {
          // Add today if not present (simple logic, assuming one completion per day per task for simplicity or just logging events)
          if (!newHistory.includes(today)) {
            newHistory = [...newHistory, today];
          }
        } else {
          // Optional: remove today if unchecking? 
          // For a habit tracker, unchecking usually means "oops I didn't do it".
          newHistory = newHistory.filter(d => d !== today);
        }

        return { ...task, completed: isCompleted, completedHistory: newHistory };
      }
      return task;
    }));
  }

  // Calculate heatmap data
  const heatMapData = tasks.reduce((acc, task) => {
    (task.completedHistory || []).forEach(date => {
      const existing = acc.find(item => item.date === date);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ date: date, count: 1 });
      }
    });
    return acc;
  }, [] as { date: string; count: number }[]);

  return (
    <>

      <div>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

        <div className='span-container'>
          <TodoList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleTaskCompletion} />
          <TodoListForm addTask={addTask} />
        </div>

        <HeatMap values={heatMapData} />


      </div>

    </>
  )
}

export default App



