import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
    const answer = new AnswerQuestionUseCase().execute({
        instructorId : '1',
        questionId : '1',
        content : "just to do basic man"
    });
    expect(answer.content).toEqual("just to do basic man")
})

/* 
    Teste pra verificar se o AnswerQuestion está criando uma resposta com o conteúdo correto
*/


