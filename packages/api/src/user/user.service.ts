import { Injectable } from "@outwalk/firefly";
import { BadRequest } from "@outwalk/firefly/errors";
import { User } from "./user.entity";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {

    async validatePassword(id: string, password: string): Promise<boolean> {
        const user = await User.findById(id).select("password").lean<User>().exec();
        return bcrypt.compare(password, user.password);
    }

    async getUser(id: string): Promise<User> {
        if (!id) return null;
        return User.findById(id).lean<User>().exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        if (!email) return null;
        return User.findOne({ email }).lean<User>().exec();
    }

    async createUser(first: string, last: string, email: string, password: string): Promise<User> {
        if (await User.exists({ email }).exec()) throw new BadRequest("Email Already Exists.");

        return await User.create({
            first,
            last,
            email,
            password,
            tasks: []
        });
    }

    async updateUser(user: User, data: any) {
        return User.findByIdAndUpdate(user.id, { $set: data }).exec();
    }
}