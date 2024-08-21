import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFound } from "./errors/resource-not-found";


interface ChooseQuestionBestAnswerProps {
  answerId : string;
  authorId : string;
}

type ChooseQuestionBestAnswerResponse = Either<NotAllowedError | ResourceNotFound, {}>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) { }
   
  async execute({ authorId, answerId } : ChooseQuestionBestAnswerProps) : Promise<ChooseQuestionBestAnswerResponse>{

    const answer = await this.answerRepository.findById(answerId)

    if(!answer) return left(new ResourceNotFound())
      
    const question = await this.questionRepository.findById(answer.questionId.toString());

    if(!question) return left(new ResourceNotFound())

    if(question.authorId.toString() != authorId) return left(new NotAllowedError())

    question.bestAnswerId = answer.id;

    this.questionRepository.save(question);

    return right({})
  } 
}