import { Inject, Injectable } from "@outwalk/firefly";

import { Task } from "@/task/task.entity";
import { User } from "@/user/user.entity";
import { TaskService } from "@/task/task.service";

export interface CountData {
    count: number;
}

@Injectable()
export class MetricsService {

    @Inject() taskService: TaskService;

    async getTaskCount(user: User): Promise<CountData> {
        return { count: await Task.countDocuments({ users: user.id }).exec() };
    }

    async getTaskTodayCount(user: User): Promise<CountData> {
        const todayFormat = await this.taskService.getTaskDateFormat(new Date());

        return {
            count: await Task.countDocuments({
                users: user.id, date: { $regex: todayFormat }, done: false
            }).exec()
        };
    }

    async getTaskTomorrowCount(user: User): Promise<CountData> {
        const today = new Date();
        today.setDate(today.getDate() + 1);

        const tomorrowFormat = await this.taskService.getTaskDateFormat(today);

        return {
            count: await Task.countDocuments({
                users: user.id, date: { $regex: tomorrowFormat }, done: false
            }).exec()
        };
    }

    async getTaskWeekCount(user: User): Promise<CountData> {
        const today = new Date();
        const format = await this.taskService.getTaskDateWeekFormat(today);

        return {
            count: await Task.countDocuments({
                users: user.id, date: { $regex: format }, done: false
            }).exec()
        };
    }

    async getTaskOverdueCount(user: User): Promise<CountData> {
        return {
            count: (
                await this.taskService.getTasksIncomplete(user)
            ).filter(
                (task) => (new Date(task.date) < new Date()) && (new Date(task.date) > new Date(0))
            ).length
        };
    }
}