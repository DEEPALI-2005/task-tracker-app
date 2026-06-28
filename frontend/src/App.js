import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatsCard from './components/StatsCard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div className="header-left">
            <h1> Task Tracker</h1>
            <p>Stay organized and productive</p>
          </div>
          <div className="header-right">
          </div>
        </div>
      </header>

      <main className="app-main">
        {error && <div className="app-error">{error}</div>}

        <StatsCard tasks={tasks} />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <div className="content-wrapper">
            <div className="form-section">
              <TaskForm onTaskAdded={handleTaskAdded} />
            </div>

            <div className="list-section">
              <TaskList
                tasks={tasks}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Task Tracker | Stay focused, stay productive 🚀</p>
      </footer>
    </div>
  );
}

export default App;