import { UserService } from "@/user/user.service";
import { Controller, Get, Inject, Middleware, Post } from "@outwalk/firefly";
import { BadRequest, Unauthorized } from "@outwalk/firefly/errors";
import { AuthService } from "./auth.service";

import { Request } from "express";

export interface LoginDTO {

}

export interface RegisterDTO {

}

export function session(req: Request, res: Response, next) {
    if (!req.session.user) throw new Unauthorized("Not Logged In");
    next();
}

@Controller()
export class AuthController {

    @Inject() authService: AuthService;
    @Inject() userService: UserService;

    @Post("/login")
    async loginToSystem(req: Request, res: Response, next): Promise<LoginDTO> {
        const { email, password } = req.body;

        const validation = await this.authService.validatePassword(email, password);

        if (validation) {
            const user = await this.userService.getUserByEmail(email);
            const token = await this.authService.getTokenByUser(user);

            req.session.user = { id: user.id, first: user.first };
        } else {
            throw new Unauthorized("Incorrect Email/Password Combo.");
        }
    }

    @Post("/register")
    async registerInSystem(req: Request): Promise<RegisterDTO> {
        const { first, last, email, password } = req.body;

        const user = await this.userService.createUser(first, last, email, password);
        const token = await this.authService.getTokenByUser(user);

        req.session.user = { id: user.id, first: user.first };

        return {};
    }

    @Post("/logout")
    async logout(req: Request) {
        req.session.destroy();
    }

}