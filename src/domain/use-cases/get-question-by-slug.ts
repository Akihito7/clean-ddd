import { Either, right } from "@/core/either";
import { Slug } from "../entities/values-objects/slug";
import { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFound } from "./errors/resource-not-found";
import { Question } from "../entities/question";

type GetQuestionBySlugResponse =  Either<ResourceNotFound | NotAllowedError ,  Question>
export class GetQuestionBySlug {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute(slug : Slug) : Promise<GetQuestionBySlugResponse>{
    const question = await this.questionsRepository.getBySlug(slug);
    return right(question)
  } 
}