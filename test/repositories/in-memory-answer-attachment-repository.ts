import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachment } from "@/domain/entities/answer-attachment";
import { AnswerAttachmentsRepository } from "@/domain/repositories/answer-attachments-repository";

export class InMemoryAnswerAttachementsRepository implements AnswerAttachmentsRepository {
  itens: AnswerAttachment[] = []

  async findManyByAnswserId(answerId: UniqueEntityId): Promise<AnswerAttachment[]> {
     return this.itens.filter(item => item.answerId === answerId.toString())
  }

  async deleteManyByAnswerId(answerId: UniqueEntityId): Promise<void> {
    this.itens = this.itens.filter(item => item.answerId != answerId.toString())
  }
}