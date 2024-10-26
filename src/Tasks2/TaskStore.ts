import { makeAutoObservable } from "mobx";

interface Task {
    id: number;
    name: string;
    isCompleted: boolean;
}

class TaskStore {
    tasks: Task[] = [];
    taskTexts: { [key: string]: string } = {};
    editingTaskId: number | null = null;
    newName: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    addTask(name: string) {
        if (!name.trim()) return;
        const newTask = {
            id: this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            name,
            isCompleted: false,
        };
        this.tasks.push(newTask);
    }

    deleteTask(taskId: number) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    changeStatus(taskId: number) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
        }
    }

    startEdit(taskId: number, currentName: string) {
        this.editingTaskId = taskId;
        this.newName = currentName;
    }

    saveEdit() {
        if (!this.newName.trim() || this.editingTaskId === null) return;
        const task = this.tasks.find((t) => t.id === this.editingTaskId);
        if (task) {
            task.name = this.newName;
        }
        this.editingTaskId = null;
        this.newName = '';
    }

    cancelEdit() {
        this.editingTaskId = null;
        this.newName = '';
    }

    setTaskText(taskId: string, text: string) {
        this.taskTexts[taskId] = text;
    }
}

export const taskStore = new TaskStore();
