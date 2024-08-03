import { QuestionComment } from "../entities/question-comment";

export interface QuestionCommentsRepository {
  create(comment : QuestionComment) : Promise<void>
  findById(commentId : string ) : Promise<QuestionComment>
  delete(comment : QuestionComment) : Promise<void>
}