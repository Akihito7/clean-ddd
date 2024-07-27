import { AnswersRepository,  } from "../repositories/answers-repository";

type DeleteAnswerProps = {
  authorId: string,
  answerId: string,
}

export class DeleteAnswerUseCase {

  constructor(private answerRepository: AnswersRepository) { }

  async execute({authorId, answerId} : DeleteAnswerProps) { 

    const answer = await this.answerRepository.findById(answerId);

    if(!answer) throw new Error("Answer not found");

    if(authorId != answer.authorId.toString()) throw new Error("not allowed");

    this.answerRepository.delete(answerId)
  }
}