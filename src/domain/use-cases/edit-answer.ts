import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";


type EditAnswerProps = {
  authorId : string,
  answerId : string,
  content : string
}

type EditAnswerUseCaseResponse = Either<ResourceNotFound | NotAllowedError , {}>
export class EditAnswerUseCase {

  constructor(private answerRepository: AnswersRepository) { }

  async execute({authorId, answerId, content} : EditAnswerProps) : Promise<EditAnswerUseCaseResponse>{

    const answer = await this.answerRepository.findById(answerId);

    if(!answer) return left(new ResourceNotFound())

    if(authorId != answer.authorId.toString()) return left(new NotAllowedError())
    
    answer.content = content;

    this.answerRepository.save(answer)

    return right({})
  }
}