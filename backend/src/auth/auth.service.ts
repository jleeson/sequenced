import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Token } from "./token.entity";
import { User } from "@/user/user.entity";
import { Inject, Injectable } from "@outwalk/firefly";
import { UserService } from "@/user/user.service";
import { Unauthorized } from "@outwalk/firefly/errors";

@Injectable()
export class AuthService {

    @Inject() userService: UserService;

    async getTokenByUser(user: User): Promise<Token> {
        const token = await Token.findOne({ user });

        if (!token)
            return Token.create(this.createToken(user, 20));

        return token;
    }

    async getTokenFromRequest(req) {
        if (!req.headers.authorization)
            return null;

        const rawToken = req.headers.authorization.split("Bearer ")[1];
        return this.getTokenData(rawToken);
    }

    async getTokenData(token: string) {
        return Token.findOne({ token }).populate<User>("user").lean<Token>().exec();
    }

    createToken(user: User, length: number = 20): Token {
        const createdAt = new Date();
        const expiresAt = new Date();
        const token = uuidv4(length);
        expiresAt.setDate(new Date().getDate() + 14);

        return {
            user,
            token,
            createdAt: createdAt.getTime(),
            expiresAt: expiresAt.getTime()
        }
    }

    async validatePassword(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        const hash = (await this.userService.getUserHash(user._id)).password;

        return bcrypt.compare(password, hash)
    }

    async isAuthorized(token) {
        if (token)
            return Token.exists({ token: token.token }).exec();

        return false;
    }

}