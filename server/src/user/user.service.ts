import { Injectable } from "@outwalk/firefly";
import { User } from "./user.entity";
import { BadRequest } from "@outwalk/firefly/errors";
import { Token } from "@/auth/token.entity";

@Injectable()
export class UserService {

    async getUser(id: string): Promise<User> {
        return User.findById(id).lean<User>().exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return User.findOne({ email }).lean<User>().exec();
    }
    
    async getUserByToken(token: string){
        return Token.findOne({ token }).populate<User>("user").lean<User>().exec();
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

}