import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import taskStore from './TaskStore';

const TaskPage = observer(() => {
    const { id } = useParams<{ id: string }>();
    const task = taskStore.getTaskById(Number(id));

    if (!task) {
        return <div>Task not found</div>;
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        taskStore.updateTaskText(id || '', e.target.value);
    };

    return (
        <div className="task-page">
            <h1>{task.name}</h1>
            <textarea
                value={taskStore.taskTexts[id || ''] || ''}
                onChange={handleTextChange}
                placeholder="Enter your text here..."
                rows={10}
                cols={50}
            />
        </div>
    );
});

export default TaskPage;
