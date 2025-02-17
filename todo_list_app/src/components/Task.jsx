import React, { useState } from 'react';
import './Task.css';

function Task({ task, onToggleComplete, onDelete, onUpdateTask }) {
  const { id, text, isCompleted } = task;

  // Set task editing state
  const [isEditing, setIsEditing] = useState(false);
  // Store edited text
  const [editText, setEditText] = useState(text);

  // Edit
  const handleEdit = () => {
    setIsEditing(true);
    setEditText(text);
  };

  // Store
  const handleSave = () => {
    onUpdateTask(id, editText);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
      {isEditing ? (
        <input 
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span>{text}</span>
      )}

      <div className="task-btns">
        {/* Toggle complete button*/}
        <button onClick={() => onToggleComplete(id)}>
          {isCompleted ? 'Unfinished' : 'Finish'}
        </button>

        {/* Set edit model button*/}
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}

        {/* Delete button*/}
        <button className="delete-btn" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Task;
