import { Question } from "../entities/question";
import { Slug } from "../entities/values-objects/slug";

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  getBySlug(slug: Slug): Promise<Question>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
}