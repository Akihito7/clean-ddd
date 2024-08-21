import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "./errors/not-allowed-error";


let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("edit question", () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  });

  it("Should be able edit question", async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("ney"),
      title: "question one",
      content: "content question 1"
    });


    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "ney",
      questionId: newQuestion.id.toString(),
      title: "question one edit",
      content: "content question update"
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "question one edit",
      content: "content question update"
    })

  })

  it("Dont should be able edit question from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("ney"),
      title: "question one",
      content: "content question 1"
    });


    await inMemoryQuestionsRepository.create(newQuestion);
     const question = await sut.execute({
      authorId: "a",
      questionId: newQuestion.id.toString(),
      title: "question one edit",
      content: "content question update"
    })

    expect(question.isLeft()).toBeTruthy();
    expect(question.value).instanceOf(NotAllowedError)
    
  })

})
