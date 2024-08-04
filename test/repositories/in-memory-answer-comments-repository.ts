import { AnswerComment } from "@/domain/entities/answer-comment";
import { AnswerCommentsRepository } from "@/domain/repositories/answer-comments-repository";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {

  public items: AnswerComment[] = []

  async create(comment: AnswerComment): Promise<void> {
    this.items.push(comment)
  }

  async findById(commentId: string): Promise<AnswerComment> {
    const comment = this.items.filter(comment => comment.id.toString() === commentId)[0]
    return comment
  }

  async delete(comment: AnswerComment): Promise<void> {
      const indexComment = this.items.findIndex(item => item.id.toString() === comment.id.toString())
      this.items.splice(indexComment, 1)
  }
}