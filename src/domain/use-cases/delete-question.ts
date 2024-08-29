import { Either, left, right, Right } from "@/core/either";
import { Question } from "../entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

type DeleteQuestionUseCaseResponse = Either<ResourceNotFound, {}>
export class DeleteQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionAttachmentRepository : QuestionAttachmentsRepository
  ) { }

  async execute(question: Question): Promise<DeleteQuestionUseCaseResponse> {
    this.questionRepository.delete(question);
    this.questionAttachmentRepository.deleteManyByQuestionId(question.id)
    return right({})
  }

}