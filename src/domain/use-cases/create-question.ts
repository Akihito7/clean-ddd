import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";
import { QuestionAttachment } from "../entities/question-attachment";

interface CreateQuestionProps {
  authorId: string,
  title: string,
  content: string,
  attachmentsIds? : string[];
}

type CreateQuestionUseCaseResponse = Either<null, Question>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository){ }
  async execute({
    authorId,
    title,
    content,
    attachmentsIds
  }: CreateQuestionProps) : Promise<CreateQuestionUseCaseResponse> {

    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })
  
    const questionsAttachments = attachmentsIds?.map(id => (
      new QuestionAttachment({
        attachmentId : id,
        questionId : question.id
      })
    ))

    question.attchaments = questionsAttachments ?? [];

    await this.questionsRepository.create(question);
    
    return right(question)
  }
}