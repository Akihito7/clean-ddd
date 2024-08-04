import { AnswerCommentsRepository, FindManyByIdAnswerParams } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answers-repository";


export class FetchAnswerCommentsUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
    private readonly answersRepository : AnswersRepository
  ) { }

  async execute({ answerId, params }: FindManyByIdAnswerParams) {
    
    const question = this.answersRepository.findById(answerId);

    if(!question) throw new Error("Answer does not found")

    const comments = this.answerCommentsRepository.findManyByIdAnswer({answerId, params});

    return comments
  }

}