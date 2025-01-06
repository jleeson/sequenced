import { UserService } from "@/user/user.service";
import { Controller, Get, Inject, Post } from "@outwalk/firefly";
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

    @Post("/validate")
    async validate(req: Request) {
        const { token } = req.body;

        const validation = await this.authService.isAuthorized(token);

        if (validation)
            return { valid: true };

        return { valid: false };
    }

    @Post("/login")
    async loginToSystem(req: Request): Promise<LoginDTO> {
        const { email, password } = req.body;

        const validation = await this.authService.validatePassword(email, password);

        if (validation) {
            const user = await this.userService.getUserByEmail(email);
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
        } else {
            throw new Unauthorized("Incorrect Email/Password Combo.");
        }
    }

    @Post("/register")
    async registerInSystem({ body, cookies }: Request): Promise<RegisterDTO> {
        const { first, last, email, password } = body;

        const user = await this.userService.createUser(first, last, email, password);
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