import { Either, left, right } from "@/core/either";
import { AnswersRepository, FindManyByQuestionIdParams } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";
import { Answer } from "../entities/answer";

type FetchQuestionAnswersResponse =  Either<ResourceNotFound | NotAllowedError , Answer[]>
export class FetchQuestionAnswers {

  constructor(
    private answersRepository : AnswersRepository,
    private questionsRepository : QuestionsRepository
  ) { }

  async execute({ questionId, params } : FindManyByQuestionIdParams) : Promise<FetchQuestionAnswersResponse> {

    const question = await this.questionsRepository.findById(questionId);

    if(!question) return left(new ResourceNotFound())

    const answers = await this.answersRepository.findManyByQuestionId({questionId, params});

    if(!answers) return right([])

    return right(answers);

  }
}