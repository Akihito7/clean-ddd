import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

type QuestionAttachmentsProps = {
  questionId : UniqueEntityId;
  attachmentId : string;
}

export class QuestionAttachment extends Entity<QuestionAttachmentsProps>{
  static create(props : QuestionAttachmentsProps, id? : string){
    const attachment = new QuestionAttachment(props, id);
    return attachment;
  }

  get questionId(){
    return this.props.questionId;
  }

  get attachmentId(){
    return this.props.attachmentId
  }
}