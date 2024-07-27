import { Answer } from "../entities/answer";

export interface AnswersRepository {
  findById(id: string): Promise<Answer>
  create(answer: Answer): Promise<void>
  delete(answerId : string): Promise<void>
  save(answer : Answer) : Promise<void>
}