import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository, FindManyByIdAnswerParams } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";
import { AnswerComment } from "../entities/answer-comment";

type FetchAnswerCommentsUseCaseResponse =  Either<ResourceNotFound | NotAllowedError , AnswerComment[]>
export class FetchAnswerCommentsUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
    private readonly answersRepository : AnswersRepository
  ) { }

  async execute({ answerId, params }: FindManyByIdAnswerParams) : Promise<FetchAnswerCommentsUseCaseResponse> {
    
    const question = this.answersRepository.findById(answerId);

    if(!question) return left(new ResourceNotFound())

    const comments = await this.answerCommentsRepository.findManyByIdAnswer({answerId, params});

    return right(comments)
  }

}