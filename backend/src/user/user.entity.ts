import { Entity, Model, Prop, Virtual } from "@outwalk/firefly/mongoose";
import { Task } from "@/task/task.entity";

import bcrypt from "bcrypt";

@Entity()
export class User extends Model {

    @Prop(String) first: string;
    @Prop(String) last: string;
    @Prop(String) email: string;
    @Prop({ type: String, select: false, set: (value) => bcrypt.hashSync(value, 10) }) password: string;
    @Prop(Boolean) synced: boolean;
    @Prop(Boolean) developer: boolean;
    
    @Virtual(String) imitating: string;
}