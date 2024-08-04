import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-respository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestiosRepository: InMemoryQuestionsRepository
let sut: FetchQuestionCommentsUseCase

describe("Fetch question comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    inMemoryQuestiosRepository = new InMemoryQuestionsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository, inMemoryQuestiosRepository)
  })

  it("Should be able fetch many comments", async () => {
    const question = makeQuestion();

    await inMemoryQuestiosRepository.create(question);

    for (let i = 0; i < 22; i++) {
      const comment = makeQuestionComment({
        questionId : question.id
      })

      await inMemoryQuestionCommentsRepository.create(comment)
    }

    const comments = await sut.execute({
      questionId : question.id.toString(),
      params : { page : 3}
    })

    expect(comments).toHaveLength(2)
  })

  it("Should be able order questions by createAt", async () => {
    const question = makeQuestion();
    await inMemoryQuestiosRepository.create(question);

    const commentOne = makeQuestionComment({
      questionId : question.id,
      createdAt : new Date(2024,7,16)
    })

    const commentTwo = makeQuestionComment({
      questionId : question.id,
      createdAt : new Date(2024,7,20)
    })
    const commentThree = makeQuestionComment({
      questionId : question.id,
      createdAt : new Date(2024,7,18)
    })

    await inMemoryQuestionCommentsRepository.create(commentOne)
    await inMemoryQuestionCommentsRepository.create(commentTwo)
    await inMemoryQuestionCommentsRepository.create(commentThree)


    const comments = await sut.execute({
      questionId : question.id.toString(),
      params : { page : 1}
    })
    expect(comments[0].createdAt).toEqual(commentTwo.createdAt)
    expect(comments[1].createdAt).toEqual(commentThree.createdAt)
    expect(comments[2].createdAt).toEqual(commentOne.createdAt)

  })
})