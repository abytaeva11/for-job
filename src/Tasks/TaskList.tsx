import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore, { Task } from './TaskStore';

const TaskList = observer(({ parentTask }: { parentTask: Task }) => {
    const [title, setTitle] = useState('');

    const createTask = () => {
        if (!title.trim()) return;
        taskStore.addTask(title, parentTask.id);
        setTitle('');
    };

    return (
        <div className="task-list">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Add subtask to ${parentTask.name}`}
            />
            <button className="btn bg-[#deef3e] mx-2" onClick={createTask}>
                Add Subtask
            </button>
            <ul>
                {parentTask.subTasks.map((subTask: Task) => ( 
                    <li key={subTask.id} className="list-group-item">
                        <span>{subTask.name}</span>
                        <button onClick={() => taskStore.deleteTask(subTask.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default TaskList;
