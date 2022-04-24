import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

import './App.css';

function App() {
    const [taskInput, setTaskInput] = useState('');
    const [tasksList, setTasksList] = useState(JSON.parse(localStorage.getItem('tasksData')) || []);

    useEffect(() => {
        localStorage.setItem('tasksData', JSON.stringify(tasksList));
    }, [tasksList]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskInput.trim()) {
            const newTask = { id: nanoid(), description: taskInput, isCompleted: false };

            setTasksList((prevTasksList) => [...prevTasksList, newTask]);
        }

        setTaskInput('');
    };

    const handleComplete = (id) => {
        const newTasksList = tasksList.map((task) => {
            if (task.id === id) task.isCompleted = !task.isCompleted;
            return task;
        });

        setTasksList(newTasksList);
    };

    const handleDelete = (id) => {
        const newTasksList = tasksList.filter((task) => task.id !== id);

        setTasksList(newTasksList);
    };

    return (
        <div className="App">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="What you gonna do?"
                        onChange={(e) => setTaskInput(e.target.value)}
                        value={taskInput || ''}
                    />
                    <button>Add task</button>
                </form>
            </div>

            <div className="tasks-container">
                <h2>Your tasks</h2>
                {tasksList.length === 0 ? (
                    <p>You have no tasks yet</p>
                ) : (
                    <ul>
                        {tasksList.map((task) => (
                            <li className={task.isCompleted && 'completed'} key={task.id}>
                                <span>{task.description}</span>
                                <div className="actions-container">
                                    <button
                                        className="actions-complete"
                                        onClick={() => handleComplete(task.id)}
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        className="actions-delete"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
