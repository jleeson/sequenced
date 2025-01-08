import { Token } from "@/auth/token.entity";
import { Controller, Get, Inject, Middleware, Patch, Post } from "@outwalk/firefly";
import { Request } from "express";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { AuthService } from "@/auth/auth.service";
import { Unauthorized } from "@outwalk/firefly/errors";
import { session } from "@/auth/auth.controller";

@Middleware(session)
@Controller()
export class UserController {

    @Inject() authService: AuthService;
    @Inject() userService: UserService;

    @Get()
    async getUser({ headers }: Request) {
        const token: Token = await this.authService.getTokenFromRequest(headers);

        return this.userService.getUserByToken(token);
    }

    @Post()
    createUser({ body }) {
        console.log("BODY", body);
    }

    @Patch("/name")
    async updateName({ headers, body }) {
        const token: Token = await this.authService.getTokenFromRequest(headers);
        const user = await this.userService.getUserByToken(token);

        const { first, last } = body;

        return await this.userService.updateUser(user, { first, last });
    }
}