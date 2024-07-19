import { randomUUID } from "crypto";

export class Answer {
    private id : string;
    public content : string;

    constructor(content : string, id? : string){
        this.id = id ?? randomUUID();
        this.content = content;
    }
}
