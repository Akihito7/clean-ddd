import { QuestionComment } from "@/domain/entities/question-comment";
import { QuestionCommentsRepository } from "@/domain/repositories/question-comments-repository";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {

  public items: QuestionComment[] = [];

  async create(comment: QuestionComment): Promise<void> {
    this.items.push(comment)
  }

  async findById(commentId: string): Promise<QuestionComment> {
    const comment = this.items.filter(comment => comment.id.toString() === commentId)[0]
    return comment;
  }

  async delete(comment: QuestionComment): Promise<void> {
    const indexComment = this.items.findIndex(item => item.id.toString() === comment.id.toString());
    this.items.splice(indexComment, 1)
  }
  
}