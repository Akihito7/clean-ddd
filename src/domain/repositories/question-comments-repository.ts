import { QuestionComment } from "../entities/question-comment";

export interface QuestionCommentsRepository {
  create(comment : QuestionComment) : Promise<void>
}