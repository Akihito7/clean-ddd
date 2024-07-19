import { randomUUID } from "crypto";

export class Question {
    private id: string
    private title: string;
    private content: string

    constructor(title: string, content: string) {
        this.id = randomUUID();
        this.title = title;
        this.content = content

    }

}


