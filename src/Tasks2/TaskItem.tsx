// TaskItem.tsx
import React, { useState } from 'react';

interface Task {
    id: number;
    name: string;
    isCompleted: boolean;
    subtasks: Task[];
}

interface TaskItemProps {
    task: Task;
    onTaskClick: () => void;
    onDeleteTask: (taskId: number) => void;
    onToggleComplete: (taskId: number) => void;
    onAddSubtask: (parentTaskId: number, subtaskName: string) => void;
    onDeleteSubtask: (parentTaskId: number, subtaskId: number) => void;
    onEditSubtask: (parentTaskId: number, subtaskId: number, newName: string) => void;
}

const TaskItem = ({
                      task,
                      onTaskClick,
                      onDeleteTask,
                      onToggleComplete,
                      onAddSubtask,
                      onDeleteSubtask,
                      onEditSubtask,
                  }: TaskItemProps) => {
    const [newSubtaskName, setNewSubtaskName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(task.name);

    const handleAddSubtask = () => {
        onAddSubtask(task.id, newSubtaskName);
        setNewSubtaskName('');
    };

    const handleSaveEdit = () => {
        onEditSubtask(task.id, task.id, editName);
        setIsEditing(false);
    };

    return (
        <li className="task-item  bg-[#818132] hover:bg-green-200 m-3" onClick={onTaskClick}>
            {isEditing ? (
                <input
                    className="border-blue-200 border-r-[10px]"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                />
            ) : (
                <span className={task.isCompleted ? 'line-through' : '' }>
                    {task.name}
                </span>
            )}
            <div className="bg-blue-200 p-5">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) => {
                        e.stopPropagation();
                        onToggleComplete(task.id);
                    }}
                />
                <label>{task.isCompleted ? 'Completed' : 'Not Completed'}</label>
                <button className=" btn bg-[#cb0707]" onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button className="btn bg-[#cb0707]" onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}>
                    &times;
                </button>
            </div>
            <div className="add-subtask bg-blue-200">
                <input
                    type="text"
                    value={newSubtaskName}
                    onChange={(e) => setNewSubtaskName(e.target.value)}
                    placeholder="Add subtask"
                />
                <button className="btn bg-[#deef3e] mx-2" onClick={(e) => { e.stopPropagation(); handleAddSubtask(); }}>
                    Add Subtask
                </button>
            </div>
            {task.subtasks.length > 0 && (
                <ul>
                    {task.subtasks.map((subtask) => (
                        <TaskItem
                            key={subtask.id}
                            task={subtask}
                            onTaskClick={onTaskClick}
                            onDeleteTask={() => onDeleteSubtask(task.id, subtask.id)}
                            onToggleComplete={() => onToggleComplete(subtask.id)}
                            onAddSubtask={onAddSubtask}
                            onDeleteSubtask={onDeleteSubtask}
                            onEditSubtask={onEditSubtask}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TaskItem;
