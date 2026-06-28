import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-message">
        <p>No tasks yet. Create one to get started! 🚀</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;