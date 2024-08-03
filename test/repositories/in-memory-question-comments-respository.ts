import { QuestionComment } from "@/domain/entities/question-comment";
import { QuestionCommentsRepository } from "@/domain/repositories/question-comments-repository";

export class InMemoryQuestionComments implements QuestionCommentsRepository {

  public items: QuestionComment[] = [];

  async create(comment: QuestionComment): Promise<void> {
    this.items.push(comment)
  }
  
}