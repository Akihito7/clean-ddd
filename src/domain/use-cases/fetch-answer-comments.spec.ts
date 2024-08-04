import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchAnswerCommentsUseCase

describe("Fetch answer comments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository, inMemoryAnswersRepository)
  })

  it("Should be able fetch many comments", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    for (let i = 0; i < 22; i++) {
      const comment = makeAnswerComment({
        answerId : answer.id
      })

      await inMemoryAnswerCommentsRepository.create(comment)
    }

    const comments = await sut.execute({
      answerId : answer.id.toString(),
      params : { page : 3}
    })

    expect(comments).toHaveLength(2)
  })

  it("Should be able order questions by createAt", async () => {
    const answer = makeAnswer();
    await inMemoryAnswersRepository.create(answer);

    const commentOne = makeAnswerComment({
      answerId : answer.id,
      createdAt : new Date(2024,7,16)
    })

    const commentTwo = makeAnswerComment({
      answerId : answer.id,
      createdAt : new Date(2024,7,20)
    })
    const commentThree = makeAnswerComment({
      answerId : answer.id,
      createdAt : new Date(2024,7,18)
    })

    await inMemoryAnswerCommentsRepository.create(commentOne)
    await inMemoryAnswerCommentsRepository.create(commentTwo)
    await inMemoryAnswerCommentsRepository.create(commentThree)


    const comments = await sut.execute({
      answerId : answer.id.toString(),
      params : { page : 1}
    })
    expect(comments[0].createdAt).toEqual(commentTwo.createdAt)
    expect(comments[1].createdAt).toEqual(commentThree.createdAt)
    expect(comments[2].createdAt).toEqual(commentOne.createdAt)

  })
})