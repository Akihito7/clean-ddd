import { randomUUID } from "crypto";
import { Slug } from "./values-objects/slug";


interface QuestionProps {
     title: string;
     slug : Slug;
     content: string;
     authorId : string;
}


export class Question {
    public id: string
    public title: string;
    public slug : Slug;
    public content: string;
    public authorId : string;

    constructor(props : QuestionProps, id? : string) {
        this.id = id ?? randomUUID();
        this.title = props.title;
        this.slug = props.slug;
        this.content = props.content;
        this.authorId = props.authorId
    }

}





