import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional";


interface AnswerComment {
  authorId: UniqueEntityId
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Comment extends Entity<AnswerComment> {
  static create(
    props: Optional<AnswerComment, 'createdAt'>
  ) {
    const answerComment = new Comment({
      ...props,
      createdAt: props.createdAt ? props.createdAt : new Date()
    });
    return answerComment;
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId;
  }

  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.content = content
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

}
