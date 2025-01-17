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

    async getTaskDateFormat(date: Date) {
        const year = `${date.getFullYear()}`;
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();

        return new RegExp(`${year}-${month}-${day}`);
    }

    async getTaskDateWeekFormat(date: Date) {
        let dates = `^(?:`;

        for (let i = 0; i < 7; i++) {
            const year = `${date.getFullYear()}`;
            const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();

            dates += `${year}-${month}-${day}`;
            if (i != 6)
                dates += "|"

            date.setDate(date.getDate() + 1);
        }

        dates += ")"

        return new RegExp(dates);
    }

    async getTasksToday(user: User) {

        const todayFormat = this.getTaskDateFormat(new Date());

        return Task.find({
            users: user.id, date: { $regex: todayFormat }, done: false
        }).populate("subtasks").lean<Task>().exec();
    }

    async getTasksTomorrow(user: User) {
        const today = new Date();
        today.setDate(today.getDate() + 1);

        const tomorrowFormat = this.getTaskDateFormat(today);

        return Task.find({
            users: user.id, date: { $regex: tomorrowFormat }, done: false
        }).populate("subtasks").lean<Task>().exec();
    }

    async getTasksWeek(user: User) {
        const today = new Date();
        const format = await this.getTaskDateWeekFormat(today);

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
        }).sort({ priority: -1 }).populate("subtasks").lean<Task>().exec();
    }

    async deleteTask(task: Task) {
        return Task.findByIdAndDelete(task.id).exec();
    }
}