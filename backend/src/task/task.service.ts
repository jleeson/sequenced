import { Injectable } from "@outwalk/firefly";
import { Task } from "./task.entity";
import { SubTask } from "./subtask.entity";
import { User } from "@/user/user.entity";

@Injectable()
export class TaskService {

    async addTask(task: Task) {
        return Task.insertMany(task);
    }

    async addTasks(tasks: Task[]) {
        return Task.insertMany(tasks);
    }

    async addSubtask(task: SubTask) {
        return SubTask.insertMany(task);
    }

    async addSubtasks(tasks: SubTask[]) {
        return SubTask.insertMany(tasks);
    }

    async updateTask(task: Task) {
        return Task.findByIdAndUpdate(task.id, { $set: task }).exec();
    }

    async getTask(id: string) {
        return Task.findById(id).populate("subtasks").lean<Task>().exec();
    }

    async getTasks(user: User) {
        return Task.find({ users: user.id }).populate("subtasks").lean<Task>().exec();
    }

    async getTasksToday(user: User) {
        const today = new Date();
        const year = `${today.getFullYear()}`;
        const month = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
        const date = (today.getDate() < 10) ? `0${today.getDate()}` : today.getDate();

        const todayFormat = new RegExp(`${year}-${month}-${date}`);

        return Task.find({
            users: user.id, date: { $regex: todayFormat }, done: false
        }).populate("subtasks").lean<Task>().exec();
    }

    async getTasksTomorrow(user: User) {
        const today = new Date();
        today.setDate(today.getDate() + 1);

        const year = `${today.getFullYear()}`;
        const month = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
        const date = (today.getDate() < 10) ? `0${today.getDate()}` : today.getDate();

        const tomorrowFormat = new RegExp(`${year}-${month}-${date}`);

        return Task.find({
            users: user.id, date: { $regex: tomorrowFormat }, done: false
        }).populate("subtasks").lean<Task>().exec();
    }

    async getTasksWeek(user: User) {
        const today = new Date();
        let dates = `^(?:`;

        for (let i = 0; i < 7; i++) {
            const year = `${today.getFullYear()}`;
            const month = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
            const date = (today.getDate() < 10) ? `0${today.getDate()}` : today.getDate();

            dates += `${year}-${month}-${date}`;
            if (i != 6)
                dates += "|"

            today.setDate(today.getDate() + 1);
        }

        dates += ")"

        const format = new RegExp(dates);
        return Task.find({
            users: user.id, date: { $regex: format }, done: false
        }).populate("subtasks").lean<Task>().exec();
    }

    async getTasksOverdue(user: User) {
        return (await this.getTasksIncomplete(user)).filter((task) => (new Date(task.date) < new Date()) && (new Date(task.date) > new Date(0)));
    }

    async getTasksIncomplete(user: User) {
        return Task.find({
            users: user.id, done: false
        }).populate("subtasks").lean<Task>().exec();
    }

    async deleteTask(task: Task) {
        return Task.findByIdAndDelete(task.id).exec();
    }
}