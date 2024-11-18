import { Controller, Get } from "@outwalk/firefly";

@Controller()
export class AppController {

    @Get()
    getHelloWorld(request, response): void {
        response.redirect("https://www.ottegi.com/sequenced");
    }
}