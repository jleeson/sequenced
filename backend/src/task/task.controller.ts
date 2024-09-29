import { AuthService } from "@/auth/auth.service";
import { User } from "@/user/user.entity";
import { UserService } from "@/user/user.service";
import { Controller, Get, Inject, Post } from "@outwalk/firefly";
import { BadRequest, Unauthorized } from "@outwalk/firefly/errors";
import { TaskService } from "./task.service";
import { Task } from "./task.entity";
import { Token } from "@/auth/token.entity";

@Controller()
export class TaskController {

    @Inject() authService: AuthService;
    @Inject() userService: UserService;
    @Inject() taskService: TaskService;

    @Get()
    async getTasks(req: Request) {
        const token: Token = await this.authService.getTokenFromRequest(req);
        const user: User = await this.userService.getUserByToken(token);

        return this.taskService.getTasks(user);
    }

    @Post("/migrate")
    async handleMigrate({ body, headers }) {
        const token: Token = await this.authService.getTokenFromRequest({ headers });
        const user = await this.userService.getUserByToken(token);

        if (user.synced) return new BadRequest("Already synced");

        if (!token) throw new Unauthorized("You are not authorized");

        if (body) {

            const tasks = body;

            const dbTasks = [];

            for (let task of tasks) {
                let dbSubtasks = [];

                if (task.subtasks) {
                    dbSubtasks.push((await this.taskService.addSubtasks(task.subtasks))[0]);
                }

                task = {
                    ...task,
                    users: [user.id],
                    subtasks: dbSubtasks
                };

                await this.taskService.addTask(task);
            }

            await this.userService.updateUser(user, { synced: true });

            return { sync: true };
        }

        return new BadRequest();
    }
}