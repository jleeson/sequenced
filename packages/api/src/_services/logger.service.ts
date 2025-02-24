import { Injectable } from "@outwalk/firefly";

@Injectable()
export class Logger {

    log(...args: string[]): void {
        console.log("[SYSTEM]  | ", ...args);
    }

    warn(...args: string[]): void {
        console.warn("[WARNING] | ", ...args);
    }

    error(...args: string[]): void {
        console.error("[ERROR] | ", ...args);
    }
}