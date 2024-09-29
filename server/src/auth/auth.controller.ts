import { UserService } from "@/user/user.service";
import { Controller, Inject, Post } from "@outwalk/firefly";
import { BadRequest, Unauthorized } from "@outwalk/firefly/errors";
import { Request } from "express";
import { AuthService } from "./auth.service";

export interface LoginDTO {

}

export interface RegisterDTO {

}

@Controller()
export class AuthController {

    @Inject() authService: AuthService;
    @Inject() userService: UserService;

    @Post("/login")
    async loginToSystem(req: Request): Promise<LoginDTO> {
        const { email, password } = req.body;

        if (!await this.authService.validatePassword(email, password))
            throw new Unauthorized("Wrong Email/Password Combo.");

        const token = await this.authService.getTokenFromRequest(req);
        const user = await this.userService.getUserByToken(token);

        if (!token) return new Unauthorized("You are not authorized");

        return {
            user: {
                id: user.id,
                email: user.email,
            },
            token: {
                token: token.token,
                createdAt: token.createdAt,
                expiresAt: token.expiresAt
            }
        };
    }

    @Post("/register")
    async registerInSystem({ body, cookies }: Request): Promise<RegisterDTO> {
        const { email, password, confirm_password } = body;
        if (password != confirm_password)
            throw new BadRequest("Passwords are not the same");

        const user = await this.userService.createUser(email, password);
        const token = await this.authService.getTokenByUser(user);

        return {
            user: {
                id: user.id,
                email: user.email,
            },
            token: {
                token: token.token,
                createdAt: token.createdAt,
                expiresAt: token.expiresAt
            }
        };
    }

}