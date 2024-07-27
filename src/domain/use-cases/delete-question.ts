import { Question } from "../entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute(question : Question){
    this.questionRepository.delete(question);
  }

}