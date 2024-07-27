import { Slug } from "../entities/values-objects/slug";
import { QuestionsRepository } from "../repositories/questions-repository";

export class GetQuestionBySlug {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute(slug : Slug){
    const question = await this.questionsRepository.getBySlug(slug);
    return { question }
  } 
}