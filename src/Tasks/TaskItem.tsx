import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

interface TaskItemProps {
    task: { id: number; name: string };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/task/${task.id}`, { state: { task } });
    };
    return (
        <li onClick={handleClick} className="cursor-pointer">
            {task.name}
        </li>
    );
};

export default TaskItem;
