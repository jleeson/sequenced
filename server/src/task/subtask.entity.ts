import { Entity, Model, Prop } from "@outwalk/firefly/mongoose";

@Entity()
export class SubTask extends Model {

    @Prop(String) title: string;
    @Prop(String) description: string;
    @Prop(String) date: string;
    @Prop(Boolean) done: boolean;
    @Prop(String) repeater: string;
    @Prop(String) reminder: string;
    @Prop(String) type: string;
    @Prop(String) id: string;
    @Prop(Boolean) accordion: boolean;

}