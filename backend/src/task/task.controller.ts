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

        if (!await this.authService.isAuthorized(token)) throw new Unauthorized("Token not authorized.");

        const user: User = await this.userService.getUserByToken(token);

        if (user)
            return this.taskService.getTasks(user);

        throw new BadRequest("Could not get data.");
    }

    @Post("/migrate")
    async handleMigrate({ body, headers }) {
        const token: Token = await this.authService.getTokenFromRequest({ headers });

        if (!this.authService.isAuthorized(token)) throw new Unauthorized("Token not authorized.");

        const user = await this.userService.getUserByToken(token);

        if (user.synced) return new BadRequest("Already synced");

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