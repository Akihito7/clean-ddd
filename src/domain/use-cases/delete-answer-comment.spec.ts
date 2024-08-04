import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswer } from "test/factories/make-answer";
import { AnswerComment } from "../entities/answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete question comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it("Should be able delete comment of question", async () => {

    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    const comment = AnswerComment.create({
      authorId: new UniqueEntityId("akihito"),
      answerId: answer.id,
      content: "hello",
    });

    await inMemoryAnswerCommentsRepository.create(comment)

    await sut.execute({
      authorId: comment.authorId.toString(),
      commentId: comment.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it("Shouldn't be able delete comment of question", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    const comment = AnswerComment.create({
      authorId: new UniqueEntityId("akihito"),
      answerId : answer.id,
      content: "hello",
    });

    await inMemoryAnswerCommentsRepository.create(comment)

    expect(() => {
      return sut.execute({
        authorId: "neymar",
        commentId: comment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })

})
