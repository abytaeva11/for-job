import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: number;
    name: string;
    isCompleted: boolean;
}

const TaskList2 = ({ listName }: { listName: string }) => {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [newName, setNewName] = useState('');
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const createTask = () => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            name: title,
            isCompleted: false,
        };

        setTasks([...tasks, newTask]);
        setTitle('');
    };

    const deleteTask = (taskId: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const changeStatus = (taskId: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const startEdit = (taskId: number, currentName: string) => {
        setEditingTaskId(taskId);
        setNewName(currentName);
    };

    const saveEdit = () => {
        if (!newName.trim() || editingTaskId === null) return;
        setTasks((prev) =>
            prev.map((task) =>
                task.id === editingTaskId ? { ...task, name: newName } : task
            )
        );
        setEditingTaskId(null);
        setNewName('');
    };

    const cancelEdit = () => {
        setEditingTaskId(null);
        setNewName('');
    };

    const handleTaskClick = (task: Task) => {
        navigate(`/task/${task.id}`, { state: { task } });
    };

    return (
        <div className="task-list">
            <input
                className="border-blue-200 border-r-[10px]"
                type="text"
                value={title}
                onChange={handleChange}
                placeholder={`Add task to ${listName}`}
            />
            <button className="btn bg-[#deef3e] mx-2" onClick={createTask}>
                Add Task
            </button>
            <ul>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="list-group-item w-full hover:bg-[#818132] d-flex items-center justify-between bg-[#48694b] p-5 my-3"
                        onClick={() => handleTaskClick(task)}
                    >
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <button
                                    onClick={saveEdit}
                                    className="btn bg-[#deef3e] mx-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="btn bg-[#deef3e] mx-2"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <span
                                className={
                                    task.isCompleted ? 'line-through' : ''
                                }
                            >
                                {task.name}
                            </span>
                        )}
                        <div className="d-flex">
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => changeStatus(task.id)}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    startEdit(task.id, task.name);
                                }}
                                className="btn bg-[#deef3e] mx-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                }}
                                className="btn bg-[#cb0707]"
                            >
                                &times;
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList2;
