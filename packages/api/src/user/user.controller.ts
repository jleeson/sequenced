import { Token } from "@/auth/token.entity";
import { Controller, Get, Inject, Middleware, Patch, Post } from "@outwalk/firefly";
import { UserService } from "./user.service";
import { AuthService } from "@/auth/auth.service";
import { Logger } from "@/_services/logger.service";
import { SessionRequest, session } from "@/auth/auth.controller";


@Middleware(session)
@Controller()
export class UserController {

    @Inject()
    authService: AuthService;

    @Inject()
    userService: UserService;

    @Inject()
    logger: Logger;

    @Get()
    async getUser({ session }: SessionRequest) {
        return this.userService.getUser(session.user.id);
    }

    @Get("/synced")
    async getSynced({ session }: SessionRequest) {
        const user = await this.userService.getUser(session.user.id);
        return user.synced;
    }

    @Post()
    createUser({ body }) {
        this.logger.log("Body", body);
    }

    @Patch("/name")
    async updateName({ headers, body }) {
        const token: Token = await this.authService.getTokenFromRequest(headers);
        const user = await this.userService.getUserByToken(token);

        const { first, last } = body;

        return await this.userService.updateUser(user, { first, last });
    }
}