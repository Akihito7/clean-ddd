import { findManyByQuestionId, QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";


export class FetchQuestionCommentsUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
    private readonly questionsRepository : QuestionsRepository
  ) { }

  async execute({ questionId, params }: findManyByQuestionId) {
    
    const question = this.questionsRepository.findById(questionId);

    if(!question) throw new Error("Question does not found")

    const comments = this.questionCommentsRepository.findManyByQuestionId({questionId, params});

    return comments
  }

}