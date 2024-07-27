import { Answer } from "@/domain/entities/answer";
import { AnswersRepository } from "@/domain/repositories/answers-repository";

export class InMemoryAnswersRepository implements AnswersRepository {

  public items: Answer[] = []
  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}