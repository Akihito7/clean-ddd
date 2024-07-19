import { randomUUID } from "crypto"

export class Student {
    private id : string
    private name : string

    constructor(name : string, id? : string){
        this.id = id ?? randomUUID()
        this.name = name;
    }
}

