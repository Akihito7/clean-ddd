import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository : InMemoryAnswersRepository;
let sut : AnswerQuestionUseCase;

describe("Create question", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  });

  it("Should be able create question", async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: "just to do basic man"
    })

    expect(answer.content).toEqual("just to do basic man")
    expect(inMemoryAnswersRepository.items[0]).toBeTruthy()
  });
})

