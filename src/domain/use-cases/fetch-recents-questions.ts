import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "../repositories/questions-repository";

export class FetchRecentesQuestions {
  constructor(private questionsRepository : QuestionsRepository){}

  async execute({ page } : PaginationParams){
    console.log(page)
    return this.questionsRepository.findManyRecents({page})
  }
}