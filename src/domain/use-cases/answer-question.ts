import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface AnswerQuestionUseCaseParams {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswerRepository) { }

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseParams) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })
    await this.answersRepository.create(answer)
    return answer
  }
}

/* 
    Caso de uso onde o um instructor responde uma question. Ta de uma maneira muito crua ainda, mas
    basicamente temos a class AnswerQuestion que tem essa unica função execute que atualmente, está
    pegando recebendo o conteúdo e criando e fazendo uma instancia da class answer passando o content
    recebido, ou seja criamos uma resposta
*/