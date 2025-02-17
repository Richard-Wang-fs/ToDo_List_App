import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import './App.css';

function App() {
  // Initialize tasks list
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Input box
  const [inputValue, setInputValue] = useState('');

  // Filter
  const [filter, setFilter] = useState('all');

  // Drag to sort
  const [draggingItemIndex, setDraggingItemIndex] = useState(null);

  // Store change task
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // Complete tasks
  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  };

  // Edit task
  const handleUpdateTask = (taskId, newText) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'uncompleted') return !task.isCompleted;
    return true; // filter === 'all'
  });

  // Dragging: start
  const handleDragStart = (e, index) => {
    setDraggingItemIndex(index);
  };

  // Dragging: hold over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Dragging: drop
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggingItemIndex === null) return;
    if (draggingItemIndex === dropIndex) {
      setDraggingItemIndex(null);
      return;
    }

    const updatedTasks = [...tasks];
    const draggedItem = updatedTasks[draggingItemIndex];
    // Change position
    updatedTasks.splice(draggingItemIndex, 1);
    updatedTasks.splice(dropIndex, 0, draggedItem);

    setTasks(updatedTasks);
    setDraggingItemIndex(null);
  };

  return (
    <div className="App">
      <h1>My To Do List</h1>

      {/* Input box */}
      <div className="input-container">
        <input 
          type="text" 
          value={inputValue}
          placeholder="Add a new task"
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      {/* fliter box */}
      <div className="filter-container">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}>
          All
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}>
          Completed
        </button>
        <button 
          className={filter === 'uncompleted' ? 'active' : ''} 
          onClick={() => setFilter('uncompleted')}>
          Incomplete
        </button>
      </div>

      {/* Task list */}
      <div className="task-list">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <Task 
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
