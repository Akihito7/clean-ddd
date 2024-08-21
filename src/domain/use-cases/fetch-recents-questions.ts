import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";
import { Question } from "../entities/question";

type FetchQuestionCommentsUseCaseResponse =  Either<ResourceNotFound | NotAllowedError , Question[]>
export class FetchRecentesQuestions {
  constructor(private questionsRepository : QuestionsRepository){}

  async execute({ page } : PaginationParams) : Promise<FetchQuestionCommentsUseCaseResponse>{
    const questions = await this.questionsRepository.findManyRecents({page})
    return right(questions)
  }
}