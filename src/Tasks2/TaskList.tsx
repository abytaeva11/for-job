// TaskList2.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';

interface Task {
    id: number;
    name: string;
    isCompleted: boolean;
    subtasks: Task[];
}

const TaskList2 = ({ listName }: { listName: string }) => {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
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
            subtasks: [],
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

    const addSubtask = (parentTaskId: number, subtaskName: string) => {
        if (!subtaskName.trim()) return;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === parentTaskId
                    ? {
                        ...task,
                        subtasks: [
                            ...task.subtasks,
                            {
                                id: task.subtasks.length
                                    ? task.subtasks[task.subtasks.length - 1].id + 1
                                    : 1,
                                name: subtaskName,
                                isCompleted: false,
                                subtasks: [],
                            },
                        ],
                    }
                    : task
            )
        );
    };

    const deleteSubtask = (parentTaskId: number, subtaskId: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === parentTaskId
                    ? {
                        ...task,
                        subtasks: task.subtasks.filter(
                            (subtask) => subtask.id !== subtaskId
                        ),
                    }
                    : task
            )
        );
    };

    const editSubtask = (parentTaskId: number, subtaskId: number, newName: string) => {
        if (!newName.trim()) return;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === parentTaskId
                    ? {
                        ...task,
                        subtasks: task.subtasks.map((subtask) =>
                            subtask.id === subtaskId
                                ? { ...subtask, name: newName }
                                : subtask
                        ),
                    }
                    : task
            )
        );
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
                    <TaskItem
                        key={task.id}
                        task={task}
                        onTaskClick={() => handleTaskClick(task)}
                        onDeleteTask={deleteTask}
                        onToggleComplete={changeStatus}
                        onAddSubtask={addSubtask}
                        onDeleteSubtask={deleteSubtask}
                        onEditSubtask={editSubtask}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList2;
