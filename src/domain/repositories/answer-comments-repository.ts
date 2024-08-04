import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../entities/answer-comment";

export interface FindManyByIdAnswerParams {
  answerId : string;
  params : PaginationParams
}

export interface AnswerCommentsRepository {
  create(comment: AnswerComment): Promise<void>
  findById(commentId: string): Promise<AnswerComment>
  delete(comment: AnswerComment): Promise<void>
  findManyByIdAnswer({answerId, params } : FindManyByIdAnswerParams ) : Promise<AnswerComment[]>
}