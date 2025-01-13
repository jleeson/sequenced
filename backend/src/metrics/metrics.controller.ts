import { Controller, Get, Inject } from "@outwalk/firefly";
import { MetricsService } from "./metrics.service";
import { UserService } from "@/user/user.service";

@Controller()
export class MetricsController {

    @Inject() metricsService: MetricsService;

    @Inject() userService: UserService;

    @Get("/tasks")
    async getTasksCount({ session }) {
        const user = await this.userService.getUser(session.user.id);
        return this.metricsService.getTaskCount(user);
    }

    @Get("/tasks/today")
    async getTasksToday({ session }){
        const user = await this.userService.getUser(session.user.id);
        return this.metricsService.getTaskTodayCount(user);
    }

    @Get("/tasks/tomorrow")
    async getTasksTomorrow({ session }){
        const user = await this.userService.getUser(session.user.id);
        return this.metricsService.getTaskTomorrowCount(user);
    }

    @Get("/tasks/week")
    async getTasksWeek({ session }){
        const user = await this.userService.getUser(session.user.id);
        return this.metricsService.getTaskWeekCount(user);
    }

    @Get("/tasks/overdue")
    async getTasksOverdue({ session }){
        const user = await this.userService.getUser(session.user.id);
        return this.metricsService.getTaskOverdueCount(user);
    }
}