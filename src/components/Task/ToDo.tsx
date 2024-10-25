    import React, {useState} from 'react';
    import TaskItem from "src/components/Task/TaskItem";

    interface Task {
        id: number;
        name: string;
        isCompleted: boolean;
    }


    const ToDo = () => {
        const [title, setTitle] = useState("");
        const [tasks, setTasks] = useState<Task[]>([]);

            const
        handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
        };

        const createTasks = () => {
            if (!title.trim()) return;

            const newTask: Task = {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                name: title,
                isCompleted: false
            }
            setTasks([...tasks, newTask])
        }

        const deleteTask = (taskId: any) => {
            setTasks((tasks) => tasks.filter((el) => el.id !== taskId))
            setTasks(tasks.filter((el) => el.id !== taskId))

        }
        const changeStatus=(id :any )=>{
            setTasks(prev=>prev.map(el=>el.id === id ? {...el, isCompleted : !el.isCompleted}: el))
        }

        return (
            <div className="todo">
                <div className="d-flex">
                    <input type="text" onChange={handleChange}/>
                    <button
                        onClick={createTasks}
                        className="btn-primary"> add
                    </button>
                </div>
                <ul className="my-3">
                    {
                        tasks.map(task =><TaskItem
                            task={task}
                            deleteTask={deleteTask}
                            changeStatus={changeStatus}
                            key={task.id}/>)
                    }
                </ul>


            </div>
        );
    };

    export default ToDo;
