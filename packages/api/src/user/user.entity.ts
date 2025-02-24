import { Entity, Model, Prop } from "@outwalk/firefly/mongoose";

import bcrypt from "bcrypt";

@Entity()
export class User extends Model {

    @Prop(String) first: string;
    @Prop(String) last: string;
    @Prop(String) email: string;
    @Prop({ type: String, select: false, set: (value) => bcrypt.hashSync(value, 10) }) password: string;
    @Prop(Boolean) synced: boolean;
    @Prop(Boolean) developer: boolean;    
}