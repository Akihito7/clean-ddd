import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("delete question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it("Should be able delete a qustion", async () => {
    const newQuestion = makeQuestion();
    inMemoryQuestionsRepository.create(newQuestion);
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    const findQuestionById = await inMemoryQuestionsRepository.findById(newQuestion.id.toString())
    if(!findQuestionById) return;
    await sut.execute(newQuestion);
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
})