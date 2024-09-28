import { Token } from "@/auth/token.entity";
import { Controller, Get, Inject, Post } from "@outwalk/firefly";
import { Request } from "express";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {

    @Inject() userService: UserService;

    @Get()
    async getUser(req) {
        const token = req.headers.authorization.split("Bearer ")[1];
        return this.userService.getUserByToken(token);
    }

    @Post()
    createUser({ body }) {
        console.log(body);
    }

}