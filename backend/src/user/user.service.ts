import { Injectable } from "@outwalk/firefly";
import { User } from "./user.entity";
import { BadRequest } from "@outwalk/firefly/errors";
import { Token } from "@/auth/token.entity";
import { Task } from "@/task/task.entity";

@Injectable()
export class UserService {

    async getUser(id: string): Promise<User> {
        if (!id) return null;
        return User.findById(id).lean<User>().exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        if (!email) return null;
        return User.findOne({ email }).lean<User>().exec();
    }

    async getUserByToken(token: Token): Promise<User> {
        if (!token) return null;
        return token.user;
    }

    async getUserHash(id: string) {
        return User.findById(id).select("password").lean<User>().exec();
    }

    async createUser(email: string, password: string): Promise<User> {
        if (await User.exists({ email }).exec())
            throw new BadRequest("Email Already Exists.");

        return await User.create({
            email,
            password,
            tasks: []
        });
    }

    async updateUser(user: User, data: any) {
        return User.findByIdAndUpdate(user.id, { $set: data }).exec();
    }
}