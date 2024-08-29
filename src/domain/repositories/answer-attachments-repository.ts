import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachment } from "../entities/answer-attachment";

export interface AnswerAttachmentsRepository {
  findManyByAnswserId(answerId : UniqueEntityId ) : Promise<AnswerAttachment[]>;
  deleteManyByAnswerId(answerId : UniqueEntityId) : Promise<void>
}