import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "../entities/question-attachment";

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId : UniqueEntityId) : Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId : UniqueEntityId) : Promise<void>
  findUniqueByAttachmentId(attachmentId : UniqueEntityId) : Promise<QuestionAttachment>
  deleteAttachmentById(attachmentId : UniqueEntityId) : Promise<void>
}