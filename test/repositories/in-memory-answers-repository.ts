import { Answer } from "@/domain/entities/answer";
import { AnswersRepository } from "@/domain/repositories/answers-repository";

export class InMemoryAnswersRepository implements AnswersRepository {

  public items: Answer[] = []

  async findById(id: string): Promise<Answer> {
    const answer = this.items.filter(answer => answer.id.toString() === id)[0];
    return answer
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answerId : string) {
    const indexAnswer = this.items.findIndex(answer => answer.id.toString() === answerId);
    this.items.splice(indexAnswer, 1)
  }
}