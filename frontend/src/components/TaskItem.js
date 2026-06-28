import React, { useState } from 'react';
import axios from 'axios';
import './TaskItem.css';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedCategory, setEditedCategory] = useState(task.category);
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');
  const [error, setError] = useState('');

  const handleToggleComplete = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { ...task, completed: !task.completed }
      );
      onTaskUpdated(response.data);
    } catch (err) {
      setError('Error updating task');
    }
  };

  const handleSaveEdit = async () => {
    setError('');
    if (!editedTitle.trim()) {
      setError('Title cannot be empty');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          title: editedTitle,
          description: editedDescription,
          category: editedCategory,
          status: editedStatus,
          dueDate: editedDueDate,
          completed: task.completed,
        }
      );
      onTaskUpdated(response.data);
      setIsEditing(false);
    } catch (err) {
      setError('Error updating task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
        onTaskDeleted(task._id);
      } catch (err) {
        setError('Error deleting task');
      }
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedCategory(task.category);
    setEditedStatus(task.status);
    setEditedDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    setIsEditing(false);
    setError('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'In Progress':
        return 'status-progress';
      case 'Pending':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Work':
        return 'category-work';
      case 'Personal':
        return 'category-personal';
      case 'Learning':
        return 'category-learning';
      case 'Health':
        return 'category-health';
      default:
        return 'category-other';
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'border-completed';
      case 'In Progress':
        return 'border-progress';
      case 'Pending':
        return 'border-pending';
      default:
        return 'border-pending';
    }
  };

  return (
    <div className={`task-item ${getBorderColor(task.status)}`}>
      {error && <div className="task-error">{error}</div>}

      {!isEditing ? (
        <>
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="task-checkbox"
            />
            <div className="task-text">
              <div className="task-header">
                <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </h3>
                <span className={`task-category ${getCategoryColor(task.category)}`}>
                  {task.category}
                </span>
              </div>

              {task.description && (
                <p className="task-description">{task.description}</p>
              )}

              <div className="task-meta">
                {task.dueDate && (
                  <span className="task-date">
                    📅 {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                <span className={`task-status ${getStatusColor(task.status)}`}>
                  • {task.status}
                </span>
              </div>
            </div>
          </div>

          <div className="task-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="btn-edit"
            >
              ✏️ Edit
            </button>
            <button onClick={handleDelete} className="btn-delete">
              🗑️ Delete
            </button>
          </div>
        </>
      ) : (
        <div className="edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
            placeholder="Task title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-textarea"
            placeholder="Task description"
            rows="2"
          />
          <div className="edit-row">
            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="edit-select"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Learning">Learning</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className="edit-select"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="edit-input"
            />
          </div>

          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="btn-save">
              💾 Save
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;