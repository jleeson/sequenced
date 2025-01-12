import { AuthService } from "@/auth/auth.service";
import { User } from "@/user/user.entity";
import { UserService } from "@/user/user.service";
import { Controller, Delete, Get, Inject, Middleware, Patch, Post } from "@outwalk/firefly";
import { BadRequest, Unauthorized } from "@outwalk/firefly/errors";
import { TaskService } from "./task.service";
import { Task } from "./task.entity";
import { Token } from "@/auth/token.entity";
import { SessionRequest, session } from "@/auth/auth.controller";

@Middleware(session)
@Controller()
export class TaskController {

    @Inject() authService: AuthService;
    @Inject() userService: UserService;
    @Inject() taskService: TaskService;

    @Get()
    async getTasks({ session }: SessionRequest) {
        const user: User = await this.userService.getUser(session.user.id);

        if (user) return this.taskService.getTasks(user);

        throw new BadRequest("Could not get data.");
    }


    @Get("/today")
    async getTasksToday({ session }) {
        const user = await this.userService.getUser(session.user.id);
        if (user) return this.taskService.getTasksToday(user);

        return [];
    }

    @Get("/tomorrow")
    async getTasksTomorrow({ session }) {
        const user = await this.userService.getUser(session.user.id);
        if (user) return this.taskService.getTasksTomorrow(user);

        return [];
    }

    @Get("/week")
    async getTasksWeek({ session }) {
        const user = await this.userService.getUser(session.user.id);
        if (user) return this.taskService.getTasksWeek(user);

        return [];
    }

    @Get("/overdue")
    async getTasksOverdue({ session }) {
        const user = await this.userService.getUser(session.user.id);
        if (user) return this.taskService.getTasksOverdue(user);

        return [];
    }

    @Get("/incomplete")
    async getTasksIncomplete({ session }) {
        const user = await this.userService.getUser(session.user.id);
        if (user) return this.taskService.getTasksIncomplete(user);

        return [];
    }

    @Post()
    async addTask({ session, body }: SessionRequest) {
        const user: User = await this.userService.getUser(session.user.id);

        const task: Task = {
            ...(body as any),
            users: [user]
        };

        return await this.taskService.addTask(task);
    }

    @Patch()
    async updateTask({ body, headers }: { body: Task, headers: Headers }) {
        const token: Token = await this.authService.getTokenFromRequest(headers);

        return await this.taskService.updateTask(body);
    }

    @Delete()
    async deleteTask({ body, headers }: { body: Task, headers: Headers }) {
        const token: Token = await this.authService.getTokenFromRequest(headers);

        return await this.taskService.deleteTask(body);
    }

    @Post("/migrate")
    async handleMigrate({ session, body }: SessionRequest) {
        const user: User = await this.userService.getUser(session.user.id);

        if (user.synced) {
            const tasks = await this.taskService.getTasks(user);

            return {
                isSynced: true,
                sync: true,
                tasks
            }
        }

        if (body) {

            const tasks = body;

            for (let task of tasks) {
                let dbSubtasks = [];

                if (task.subtasks) {
                    dbSubtasks.push((await this.taskService.addSubtasks(task.subtasks))[0]);
                }

                let done = task.done;

                if (task.done != null)
                    if (typeof task.done != "boolean")
                        done = true;
                    else
                        done = task.done;

                task = {
                    ...task,
                    done,
                    users: [user.id],
                    subtasks: dbSubtasks
                };

                await this.taskService.addTask(task);
            }

            await this.userService.updateUser(user, { synced: true });

            return { sync: true };
        }

        throw new BadRequest();
    }
}