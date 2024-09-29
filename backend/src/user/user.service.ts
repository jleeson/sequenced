import { Injectable } from "@outwalk/firefly";
import { User } from "./user.entity";
import { BadRequest } from "@outwalk/firefly/errors";
import { Token } from "@/auth/token.entity";
import { Task } from "@/task/task.entity";

@Injectable()
export class UserService {

    async getUser(id: string): Promise<User> {
        return User.findById(id).populate<Task>("tasks").lean<User>().exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return User.findOne({ email }).populate<Task>("tasks").lean<User>().exec();
    }

    async getUserByToken(token: Token) {
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
        console.log(data);
        
        return User.findByIdAndUpdate(user.id, { $set: data }).exec();
    }
}