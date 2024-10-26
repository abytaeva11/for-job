import { makeAutoObservable } from 'mobx';

export interface Task {
    id: number;
    name: string;
    isCompleted: boolean;
    subTasks: Task[];
}

class TaskStore {
    tasks: Task[] = [];
    taskTexts: { [key: string]: string } = {};

    constructor() {
        makeAutoObservable(this);
    }

    addTask(name: string, parentId: number | null = null) {
        const newTask: Task = {
            id: this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            name,
            isCompleted: false,
            subTasks: [],
        };

        if (parentId === null) {
            this.tasks.push(newTask);
        } else {
            this.addSubTask(this.tasks, parentId, newTask);
        }
    }

    addSubTask(tasks: Task[], parentId: number, newTask: Task) {
        tasks.forEach(task => {
            if (task.id === parentId) {
                task.subTasks.push(newTask);
            } else {
                this.addSubTask(task.subTasks, parentId, newTask);
            }
        });
    }

    deleteTask(taskId: number) {
        this.tasks = this.removeTask(this.tasks, taskId);
    }

    removeTask(tasks: Task[], taskId: number): Task[] {
        return tasks
            .filter(task => task.id !== taskId)
            .map(task => ({
                ...task,
                subTasks: this.removeTask(task.subTasks, taskId),
            }));
    }

    toggleTaskStatus(taskId: number) {
        this.tasks = this.changeTaskStatus(this.tasks, taskId);
    }

    changeTaskStatus(tasks: Task[], taskId: number): Task[] {
        return tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted,
                    subTasks: this.changeSubTasksStatus(task.subTasks, !task.isCompleted),
                };
            } else {
                return {
                    ...task,
                    subTasks: this.changeTaskStatus(task.subTasks, taskId),
                };
            }
        });
    }

    changeSubTasksStatus(subTasks: Task[], newStatus: boolean): Task[] {
        return subTasks.map(subTask => ({
            ...subTask,
            isCompleted: newStatus,
            subTasks: this.changeSubTasksStatus(subTask.subTasks, newStatus),
        }));
    }

    updateTaskText(taskId: string, text: string) {
        this.taskTexts[taskId] = text;
    }

    getTaskById(taskId: number): Task | undefined {
        const findTask = (tasks: Task[]): Task | undefined => {
            for (const task of tasks) {
                if (task.id === taskId) return task;
                const foundInSubTasks = findTask(task.subTasks);
                if (foundInSubTasks) return foundInSubTasks;
            }
            return undefined;
        };
        return findTask(this.tasks);
    }
}

export default new TaskStore();
