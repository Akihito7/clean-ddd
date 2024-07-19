import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseParams {
    //id : string
    instructorId : string;
    questionId : string;
    content : string;

}

export class AnswerQuestionUseCase {
    execute({instructorId, questionId, content } : AnswerQuestionUseCaseParams){
        return new Answer(content)
    }
}

/* 
    Caso de uso onde o um instructor responde uma question. Ta de uma maneira muito crua ainda, mas
    basicamente temos a class AnswerQuestion que tem essa unica função execute que atualmente, está
    pegando recebendo o conteúdo e criando e fazendo uma instancia da class answer passando o content
    recebido, ou seja criamos uma resposta
*/