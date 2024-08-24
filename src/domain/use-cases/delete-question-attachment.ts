import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFound } from "./errors/resource-not-found";


type DeleteQuestionAttachmentResponse = Either<ResourceNotFound, null>
export class DeleteQuestionAttachment {
  constructor(private readonly questionAttachmentsRepository: QuestionAttachmentsRepository) { }

  async execute(attachmentId: string): Promise<DeleteQuestionAttachmentResponse> {
    const attachment = await this.questionAttachmentsRepository.findUniqueByAttachmentId(new UniqueEntityId(attachmentId));
    if(!attachment) return left(new ResourceNotFound())
    await this.questionAttachmentsRepository.deleteAttachmentById(new UniqueEntityId(attachmentId))
    return right(null)
  }
}