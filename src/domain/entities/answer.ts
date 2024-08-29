import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { AnswerAttachmentList } from "./answer-attchament-list";

export interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  attachments : AnswerAttachmentList
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {

  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments' >,
    id?: string
  ) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
      attachments : props.attachments ?? new AnswerAttachmentList()
    }, id)

    return answer;
  }

  get id(){
    return this._id
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get attachments(){
    return this.props.attachments;
  }

  set attachments(attachments :  AnswerAttachmentList){
    this.props.attachments = attachments
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get excerpt() {
    return this.props.content
      .substring(0, 120)
      .trimEnd()
      .concat("...")
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    return this.props.updatedAt = new Date()
  }
}
