import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "@/domain/entities/question-attachment";
import { QuestionAttachmentsRepository } from "@/domain/repositories/question-attachments-repository";


export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {

  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: UniqueEntityId): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(attachment => attachment.questionId === questionId);
    return questionAttachments;
  }
}