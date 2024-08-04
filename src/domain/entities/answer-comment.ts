import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { CommentProps, Comments } from "./comment";
import { Optional } from "@/core/types/optional";

interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comments<AnswerCommentProps> {

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answer = new AnswerComment({
      ...props,
      createdAt: props.createdAt ? props.createdAt : new Date()
    })

    return answer;
  }

  get id() {
    return this._id;
  }

  get answer() {
    return this.props.answerId;
  }

}

