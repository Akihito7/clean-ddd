import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionProps {
  authorId: string,
  title: string,
  content: string,
}

export class CreateQuestionUseCase {

  constructor(private questionsRepository: QuestionsRepository) { }
  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionProps) {

    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question);
    
    return {
      question
    }
  }
}