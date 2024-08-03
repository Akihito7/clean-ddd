import { AnswerComment } from "@/domain/entities/answer-comment";
import { AnswerCommentsRepository } from "@/domain/repositories/answer-comments-repository";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {

  public items: AnswerComment[] = []

  async create(comment: AnswerComment): Promise<void> {
    this.items.push(comment)
  }
  
}