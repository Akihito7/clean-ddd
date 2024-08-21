import { Either, right, Right } from "@/core/either";
import { Question } from "../entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

type DeleteQuestionUseCaseResponse = Either<null, {}>
export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute(question: Question) : Promise<DeleteQuestionUseCaseResponse>{
    this.questionRepository.delete(question);
    return right({})
  }

}