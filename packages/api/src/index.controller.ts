import { Controller, Get } from "@outwalk/firefly";
import { Request, Response } from "express";

@Controller()
export class AppController {

    @Get()
    getHelloWorld(req: Request, res: Response): void {
        res.redirect("https://www.ottegi.com/sequenced");
    }
}