import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "../entities/question-attachment";

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId : UniqueEntityId) : Promise<QuestionAttachment[]>
}