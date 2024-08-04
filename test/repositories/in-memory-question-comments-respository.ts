import { QuestionComment } from "@/domain/entities/question-comment";
import { findManyByQuestionId, QuestionCommentsRepository } from "@/domain/repositories/question-comments-repository";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {

  public items: QuestionComment[] = [];

  async create(comment: QuestionComment): Promise<void> {
    this.items.push(comment)
  }

  async findById(commentId: string): Promise<QuestionComment> {
    const comment = this.items.filter(comment => comment.id.toString() === commentId)[0]
    return comment;
  }

  async findManyByQuestionId({ questionId, params : { page } }: findManyByQuestionId): Promise<QuestionComment[]> {

    const itemsPerPage = 10;

    const offset = (page - 1) * itemsPerPage;

    const filteredComments = this.items.filter(item => item.questionId.toString() === questionId)

    const paginatedComments = filteredComments.slice(offset, offset + itemsPerPage);

    const sortedQuestions = paginatedComments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return sortedQuestions;
  }

  async delete(comment: QuestionComment): Promise<void> {
    const indexComment = this.items.findIndex(item => item.id.toString() === comment.id.toString());
    this.items.splice(indexComment, 1)
  }
  
}