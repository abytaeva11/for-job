// TaskPage2.tsx
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const TaskPage2 = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { task } = location.state || { task: { name: 'Task not found' } };
    const [taskTexts, setTaskTexts] = useState<{ [key: string]: string }>({});

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        if (id) {
            setTaskTexts((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };

    return (
        <div className="task-page w-full items-center d-flex justify-center">
            <h1 className="text-white text-[34px] text-center ">{task.name}</h1>
            <textarea
                className="text-black text-xl items-center d-flex justify-center w-[90%] ml-10"
                value={id ? taskTexts[id] || '' : ''}
                onChange={handleTextChange}
                placeholder="Enter your text here..."
                rows={10}
                cols={100}
            />
        </div>
    );
};

export default TaskPage2;
