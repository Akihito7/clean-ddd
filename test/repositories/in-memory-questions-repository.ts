import { PaginationParams } from "@/core/repositories/pagination-params";
import { Question, QuestionProps } from "@/domain/entities/question";
import { Slug } from "@/domain/entities/values-objects/slug";
import { QuestionAttachmentsRepository } from "@/domain/repositories/question-attachments-repository";
import { QuestionsRepository } from "@/domain/repositories/questions-repository";
import { InMemoryQuestionAttachmentsRepository } from "./in-memory-question-attachments-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {

  public items: Question[] = [];

  async findById(id: string) {
    const question = this.items.filter(item => item.id.toString() === id)[0];
    if (!question) return null
    return question
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async getBySlug(slug: Slug): Promise<Question> {
    const [selectedItem] = this.items.filter(item => item.slug.value === slug.value);
    return selectedItem;
  }

  async delete(question: Question): Promise<void> {
    const indexQuestion = this.items.findIndex(item => item.id.toString() === question.id.toString());
    this.items.splice(indexQuestion, 1)
  }

  async save(question: Question) {
    const indexQuestion = this.items.findIndex(question => question.id.toString() === question.id.toString());
    this.items[indexQuestion] = question;
  }

  async findManyRecents({ page } : PaginationParams): Promise<Question[]> {

    const itemsPerPage = 10;

    const offset = (page - 1) * itemsPerPage;

    const paginatedQuestions = this.items.slice(offset, offset + itemsPerPage);
    
    const sortedQuestions = paginatedQuestions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return sortedQuestions;
}


}
