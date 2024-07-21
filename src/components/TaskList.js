import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';
import Task from './Task';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

    useEffect(() => {
        const getTasks = async () => {
            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks);
        };

        getTasks();
    }, []);

    const handleCreate = async () => {
        const createdTask = await createTask(newTask);
        setTasks([...tasks, createdTask]);
        setNewTask({ title: '', description: '', dueDate: '' });
    };

    const handleUpdate = async (id, updates) => {
        const updatedTask = await updateTask(id, updates);
        setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div className="task-list">
            <h1>Task Manager</h1>
            <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <button onClick={handleCreate}>Add Task</button>

            {tasks.map(task => (
                <Task key={task._id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default TaskList;

