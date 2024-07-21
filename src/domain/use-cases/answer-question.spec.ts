import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

const fakeAnswerRepository : AnswerRepository = {
  create : async (answer : Answer) => {
    return;
  }
}
test("create an answer", async () => {
    const answerQuestion =  new AnswerQuestionUseCase(fakeAnswerRepository);

    const answer = await answerQuestion.execute({
      instructorId : '1',
      questionId : '1',
      content : "just to do basic man"
  })
    expect(answer.content).toEqual("just to do basic man")
})

/* 
    Teste pra verificar se o AnswerQuestion está criando uma resposta com o conteúdo correto
*/


