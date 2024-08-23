import { Entity } from "@/core/entities/entity";

type AnswerAttachmentProps = {
  answerId : string;
  attachmentId : string
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps>{
  static create(props : AnswerAttachmentProps, id? : string){
    const attachment = new AnswerAttachment(props, id);
    return attachment
  }

  get answerId(){
    return this.props.answerId;
  }

  get attachmentId(){
    return this.props.attachmentId
  }
}