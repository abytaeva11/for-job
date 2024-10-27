import React, { useState } from 'react';

interface Task {
    id: number;
    name: string;
    isCompleted: boolean;
}

interface TaskItemProps {
    task: Task;
    deleteTask: (taskId: number) => void;
    changeStatus:any
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask,changeStatus }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName]=useState(task.name)



    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    const handleSave = () => {
        if (newName.trim()) {
            task.name = newName;
        }
        setIsEdit(false);
    };



    return (
        <li className="list-group-item  d-flex items-center justify-between">
            {isEdit ? (
                <>
                    <input

                        type="text"
                        value={newName}
                        onChange={handleEditChange}
                    />
                    <button onClick={handleSave} className="btn bg-[#deef3e] mx-2">Save</button>
                </>
            ) : (
                <span className={task.isCompleted ? "line-through" : ""}>{task.name}</span>
            )}
            <div className="d-flex ">
                <input  onChange={()=>changeStatus(task.id)} defaultChecked={task.isCompleted} type="checkbox"/>
                <button
                    onClick={() => setIsEdit(!isEdit)}
                    className="btn bg-[#deef3e] mx-2">
                    {isEdit ? 'Cancel' : 'Edit'}
                </button>
                <button
                    onClick={() => deleteTask(task.id)}
                    className="btn bg-[#cb0707]"> &times; </button>
            </div>
        </li>
    );
};

export default TaskItem;
