import { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "../entities/answer";
export interface FindManyByQuestionIdParams {
  questionId : string,
  params : PaginationParams
}

export interface AnswersRepository {
  findManyByQuestionId( {questionId, params } : FindManyByQuestionIdParams) : Promise<Answer[]>
  findById(id: string): Promise<Answer>
  create(answer: Answer): Promise<void>
  delete(answerId : string): Promise<void>
  save(answer : Answer) : Promise<void>
}