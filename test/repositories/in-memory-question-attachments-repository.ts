import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "@/domain/entities/question-attachment";
import { QuestionAttachmentsRepository } from "@/domain/repositories/question-attachments-repository";


export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {

  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: UniqueEntityId): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(attachment => attachment.questionId === questionId);
    return questionAttachments;
  }

  async deleteAttachmentById(attachmentId: UniqueEntityId): Promise<void> {
    const index = this.items.findIndex(item => new UniqueEntityId(item.attachmentId) === attachmentId);
    this.items.splice(index, 1)
  }
  async findUniqueByAttachmentId(attachmentId: UniqueEntityId): Promise<QuestionAttachment> {
    const result = this.items.filter(item => item.attachmentId === attachmentId.toValue())[0];
    return result;
  }
  async deleteManyByQuestionId(questionId: UniqueEntityId): Promise<void> {
    const result = this.items.filter(attachment => attachment.questionId != questionId)
    this.items = result;
  }
}