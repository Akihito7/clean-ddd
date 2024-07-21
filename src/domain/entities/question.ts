import { randomUUID } from "crypto";


interface QuestionProps {
  title: string;
  content: string
  authorId: string;
}
export class Question {
  private id: string
  private title: string;
  private content: string
  public authorId: string;

  constructor(props : QuestionProps, content: string) {
    this.id = randomUUID();
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
  }

}


