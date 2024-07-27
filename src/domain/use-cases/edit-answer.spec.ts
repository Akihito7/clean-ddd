import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeQuestion } from "test/factories/make-question"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";


let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("edit question", () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  });

  it("Should be able edit question", async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("ney"),
      content: "content answer 1",
    });

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: "ney",
      content: "content answer update"
    })

    expect(inMemoryAnswersRepository.items[0].props).toMatchObject({
      authorId: { _value: 'ney' },
      content: 'content answer update',
    });
  })

  it("Dont should be able edit answer from another user", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("ney"),
      content: "content answer",
    });

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        answerId : newAnswer.id.toString(),
        authorId: "a",
        content: "content answer"
      })
    }).rejects.toBeInstanceOf(Error)
  })

})
