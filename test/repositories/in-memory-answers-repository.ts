import { Answer } from "@/domain/entities/answer";
import { AnswersRepository, FindManyByQuestionIdParams } from "@/domain/repositories/answers-repository";

export class InMemoryAnswersRepository implements AnswersRepository {

  public items: Answer[] = []

  async findById(id: string): Promise<Answer> {
    const answer = this.items.filter(answer => answer.id.toString() === id)[0];
    return answer
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answerId: string) {
    const indexAnswer = this.items.findIndex(answer => answer.id.toString() === answerId);
    this.items.splice(indexAnswer, 1)
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(item => item.id.toString() === answer.id.toString());
    this.items[answerIndex] = answer;
  }

  async findManyByQuestionId({ questionId, params : { page } }: FindManyByQuestionIdParams): Promise<Answer[]> {

    const itemPerPage = 10;

    const offset = (page - 1) * itemPerPage

    const filteredAnswers = this.items.filter((answer) => answer.questionId.toString() === questionId)

    const paginatedAnswers = filteredAnswers.slice(offset, offset + itemPerPage);

    const sortedAnswers = paginatedAnswers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return sortedAnswers;
  }
}