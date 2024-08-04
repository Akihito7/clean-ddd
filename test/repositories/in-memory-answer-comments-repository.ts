import { AnswerComment } from "@/domain/entities/answer-comment";
import { AnswerCommentsRepository, FindManyByIdAnswerParams } from "@/domain/repositories/answer-comments-repository";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {

  public items: AnswerComment[] = []

  async create(comment: AnswerComment): Promise<void> {
    this.items.push(comment)
  }

  async findById(commentId: string): Promise<AnswerComment> {
    const comment = this.items.filter(comment => comment.id.toString() === commentId)[0]
    return comment
  }
  async findManyByIdAnswer({ answerId, params : { page }}: FindManyByIdAnswerParams): Promise<AnswerComment[]> {
    
    const itemsPerPage = 10;

    const offset = (page - 1) * itemsPerPage;

    const filteredComments = this.items.filter(item => item.answerId.toString() === answerId)

    const paginatedComments = filteredComments.slice(offset, offset + itemsPerPage);

    const sortedQuestions = paginatedComments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return sortedQuestions;
  }

  async delete(comment: AnswerComment): Promise<void> {
      const indexComment = this.items.findIndex(item => item.id.toString() === comment.id.toString())
      this.items.splice(indexComment, 1)
  }
}