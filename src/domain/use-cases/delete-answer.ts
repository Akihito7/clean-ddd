import { Either, left, right } from "@/core/either";
import { AnswersRepository,  } from "../repositories/answers-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";

type DeleteAnswerProps = {
  authorId: string,
  answerId: string,
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFound | NotAllowedError , {}>

export class DeleteAnswerUseCase {

  constructor(private answerRepository: AnswersRepository) { }

  async execute({authorId, answerId} : DeleteAnswerProps) : Promise<DeleteAnswerUseCaseResponse>{ 

    const answer = await this.answerRepository.findById(answerId);

    if(!answer) return left(new ResourceNotFound())

    if(authorId != answer.authorId.toString()) return left(new NotAllowedError())
    this.answerRepository.delete(answerId)

    return right({})
  }
}