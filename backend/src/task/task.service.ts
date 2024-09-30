import { Injectable } from "@outwalk/firefly";
import { Task } from "./task.entity";
import { SubTask } from "./subtask.entity";
import { User } from "@/user/user.entity";

@Injectable()
export class TaskService {

    async addTask(task: Task) {
        return Task.insertMany(task);
    }

    async addTasks(tasks: Task[]) {
        return Task.insertMany(tasks);
    }

    async addSubtask(task: SubTask) {
        return SubTask.insertMany(task);
    }

    async addSubtasks(tasks: SubTask[]) {
        return SubTask.insertMany(tasks);
    }

    async updateTask(task: Task) {
        return Task.findByIdAndUpdate(task.id, { $set: task }).exec();
    }

    async getTask(id: string) {
        return Task.findById(id).populate("subtasks").lean<Task>().exec();
    }

    async getTasks(user: User) {
        return Task.find({ users: user.id }).populate("subtasks").lean<Task>().exec();
    }

    async deleteTask(task: Task) {
        console.log("task", task);
        return Task.findByIdAndDelete(task.id).exec();
    }
}