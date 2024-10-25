import React, { useState } from 'react';

const Task = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">
            <div className="accordion-header">
                <button type="button"
                    onClick={toggleAccordion}
                    className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:outline-none"
                    aria-expanded={isOpen} >
                    <span>What is an Accordion?</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="accordion-content flex items-center justify-center  p-5 border border-t-0 border-gray-200">
                    <p className="text-gray-500">  wjehbfhqb  </p>  <input type="checkbox"/>
                </div>

            )}
        </div>
    );
};

export default Task;
