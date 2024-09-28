import { Entity, Model, Prop } from "@outwalk/firefly/mongoose";

import { User } from "@/user/user.entity";

@Entity()
export class Token extends Model {

    @Prop(User) user: User;
    @Prop(String) token: string;
    @Prop(Number) createdAt: number;
    @Prop(Number) expiresAt: number;
    
}