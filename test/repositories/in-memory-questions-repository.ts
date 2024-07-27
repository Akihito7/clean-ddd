import { Question } from "@/domain/entities/question";
import { Slug } from "@/domain/entities/values-objects/slug";
import { QuestionsRepository } from "@/domain/repositories/questions-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async findById(id: string) {
      const question = this.items.filter(item => item.id.toString() === id)[0];
      if(!question) return null
      return question
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)

    //logica para salvar os dados
  }

  async getBySlug(slug: Slug): Promise<Question> {
    const [selectedItem] = this.items.filter(item => item.slug.value === slug.value);
    return selectedItem;
  }

  async delete(question: Question): Promise<void> {
    const indexQuestion = this.items.findIndex(item => item.id === question.id);
    this.items.splice(indexQuestion,1)
  }
}
