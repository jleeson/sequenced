import { Entity, Model, Prop } from "@outwalk/firefly/mongoose";
import { SubTask } from "./subtask.entity";
import { User } from "@/user/user.entity";

@Entity()
export class Task extends Model {

    @Prop(String) title: string;
    @Prop(String) description: string;
    @Prop(String) date: string;
    @Prop(Boolean) done: boolean;
    @Prop(String) repeater: string;
    @Prop(String) reminder: string;
    @Prop([SubTask]) subtasks: SubTask[];
    @Prop(String) type: string;
    @Prop(String) id: string;
    @Prop(Boolean) accordion: boolean;
    @Prop([User]) users: User[];
    @Prop(Number) priority: number;

}