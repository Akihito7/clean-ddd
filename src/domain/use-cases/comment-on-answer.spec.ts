import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerUseCase;

describe("Create answer comment repository", () => {

  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository()

    sut = new CommentOnAnswerUseCase(inMemoryAnswerCommentRepository, inMemoryAnswerRepository)
  })

  it("Should be able create answer comment", async () => {

    const answer = makeAnswer();
    await inMemoryAnswerRepository.create(answer);

    expect(inMemoryAnswerRepository.items).toHaveLength(1);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: "1",
      content: "hello"
    })

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual("hello")
  })
})