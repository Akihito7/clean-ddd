import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../entities/question-comment";

export interface findManyByQuestionId {
  questionId : string;
  params : PaginationParams
}

export interface QuestionCommentsRepository {
  create(comment: QuestionComment): Promise<void>
  findById(commentId: string): Promise<QuestionComment>
  delete(comment: QuestionComment): Promise<void>
  findManyByQuestionId({questionId, params} : findManyByQuestionId): Promise<QuestionComment[]>
}