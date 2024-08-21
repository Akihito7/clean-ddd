import { Either, left, right } from "@/core/either";
import { findManyByQuestionId, QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";
import { Q } from "vitest/dist/reporters-B7ebVMkT";
import { QuestionComment } from "../entities/question-comment";

type FetchQuestionCommentsUseCaseResponse =  Either<ResourceNotFound | NotAllowedError , QuestionComment[]>
export class FetchQuestionCommentsUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
    private readonly questionsRepository : QuestionsRepository
  ) { }

  async execute({ questionId, params }: findManyByQuestionId) : Promise<FetchQuestionCommentsUseCaseResponse> {
    
    const question = this.questionsRepository.findById(questionId);

    if(!question) return left(new ResourceNotFound())

    const comments = await this.questionCommentsRepository.findManyByQuestionId({questionId, params});

    return right(comments)
  }

}