import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";

type EditAnswerProps = {
  authorId: string,
  questionId: string,
  title: string,
  content: string,
}
type EditQuestionUseCaseResponse =  Either<ResourceNotFound | NotAllowedError , {}>
export class EditQuestionUseCase {

  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ authorId, questionId, title, content }: EditAnswerProps) : Promise<EditQuestionUseCaseResponse>{

    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFound())

    if (authorId != question.authorId.toString()) return left(new NotAllowedError())

    question.title = title;
    question.content = content;

    this.questionsRepository.save(question)

    return right({})
  }
}