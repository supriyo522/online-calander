import React from 'react';
import './Task.css';

const Task = ({ task, onUpdate, onDelete }) => {
    return (
        <div className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
            <button onClick={() => onUpdate(task._id, { completed: !task.completed })}>
                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
        </div>
    );
};

export default Task;

