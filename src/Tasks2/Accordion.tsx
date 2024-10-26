import React, { useState } from 'react';
import TaskList from "src/Tasks2/TaskList";

const Accordion2 = () => {
    const [isOpen, setIsOpen] = useState<number | null>(null);
    const [taskLists, setTaskLists] = useState<string[]>(['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4', 'Задача 5']);

    const toggleAccordion = (index: number) => {
        setIsOpen(isOpen === index ? null : index);
    };

    return (
        <div className="accordion">
            {taskLists.map((list, index) => (
                <div key={index}>
                    <div className="accordion-header">
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="flex items-center justify-between w-full p-5 bg-[#48694b] hover:bg-[#818132] font-medium text-left text-white border border-b-0 border-gray-200 focus:outline-none"
                            aria-expanded={isOpen === index}
                        >
                            <span className="text-xl">{list}</span>
                            <span className="ml-2">
                                {isOpen === index ? '▲' : '▼'}
                            </span>
                        </button>
                    </div>
                    {isOpen === index && (
                        <div className="accordion-content w-full d-flex items-center justify-between bg-[#48694b] p-5 mb-5">
                            <TaskList listName={list} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion2;
