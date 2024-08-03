import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { CommentProps, Comments } from "./comment";
import { Optional } from "@/core/types/optional";

interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comments<QuestionCommentProps> {

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const question = new QuestionComment({
      ...props,
      createdAt: props.createdAt ? props.createdAt : new Date()
    })

    return question;
  }

  get questionId() {
    return this.props.questionId;
  }

}
