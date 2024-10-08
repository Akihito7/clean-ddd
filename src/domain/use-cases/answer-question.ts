import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerAttachment } from "../entities/answer-attachment";
import { AnswerAttachmentList } from "../entities/answer-attchament-list";

interface AnswerQuestionUseCaseParams {
  instructorId: string;
  questionId: string;
  content: string;
  attachementsIds? : string[]
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ) { }

  async execute({ instructorId, questionId, content, attachementsIds }: AnswerQuestionUseCaseParams) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    const answerAttachments = attachementsIds?.map(attachmentId => (
      new AnswerAttachment({
        answerId : answer.id.toString(),
        attachmentId : attachmentId
      })
    ))

    const attachementsListWatched = new AnswerAttachmentList(answerAttachments)

    answer.attachments = attachementsListWatched ?? []

    await this.answersRepository.create(answer)

    return { answer }
  }
}

/* 
    Caso de uso onde o um instructor responde uma question. Ta de uma maneira muito crua ainda, mas
    basicamente temos a class AnswerQuestion que tem essa unica função execute que atualmente, está
    pegando recebendo o conteúdo e criando e fazendo uma instancia da class answer passando o content
    recebido, ou seja criamos uma resposta
*/