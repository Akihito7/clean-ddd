import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {

  static create(
    props: Optional<AnswerProps, 'createdAt' >,
    id?: string
  ) {
    const answer = new Answer({
      ...props,
      createdAt: new Date()
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