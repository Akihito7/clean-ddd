import { AnswerComment } from "../entities/answer-comment";

export interface AnswerCommentsRepository {
  create(comment: AnswerComment): Promise<void>
  findById(commentId: string): Promise<AnswerComment>
  delete(comment: AnswerComment): Promise<void>
}