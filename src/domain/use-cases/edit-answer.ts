import { AnswersRepository } from "../repositories/answers-repository";


type EditAnswerProps = {
  authorId : string,
  answerId : string,
  content : string
}


export class EditAnswerUseCase {

  constructor(private answerRepository: AnswersRepository) { }

  async execute({authorId, answerId, content} : EditAnswerProps) {

    const answer = await this.answerRepository.findById(answerId);

    if(!answer) throw new Error("Answer not found!")

    if(authorId != answer.authorId.toString()) throw new Error("Not allowed")
    
    answer.content = content;

    this.answerRepository.save(answer)
  }
}