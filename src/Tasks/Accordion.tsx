import React from 'react';
import { observer } from 'mobx-react-lite';
import TaskList from './TaskList';
import taskStore from './TaskStore';

const Accordion = observer(() => {
    const [isOpen, setIsOpen] = React.useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setIsOpen(isOpen === index ? null : index);
    };

    return (
        <div className="accordion">
            {taskStore.tasks.map((task, index) => (
                <div key={index}>
                    <div className="accordion-header">
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="flex items-center justify-between w-full p-5 bg-[#48694b] hover:bg-[#818132] font-medium text-left text-white border border-b-0 border-gray-200 focus:outline-none"
                            aria-expanded={isOpen === index}
                        >
                            <span className="text-xl">{task.name}</span>
                            <span className="ml-2">
                                {isOpen === index ? '▲' : '▼'}
                            </span>
                        </button>
                    </div>
                    {isOpen === index && (
                        <div className="accordion-content w-full d-flex items-center justify-between bg-[#48694b] p-5 mb-5">
                            <TaskList parentTask={task} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
});

export default Accordion;
