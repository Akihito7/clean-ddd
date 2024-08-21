import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-respository";
import { makeQuestion } from "test/factories/make-question";
import { QuestionComment } from "../entities/question-comment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete question comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it("Should be able delete comment of question", async () => {
    
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    const comment = QuestionComment.create({
      authorId: new UniqueEntityId("akihito"),
      questionId: question.id,
      content: "hello",
    });

    await inMemoryQuestionCommentsRepository.create(comment)

    await sut.execute({
      authorId: comment.authorId.toString(),
      commentId: comment.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)

  })

  it("Shouldn't be able delete comment of question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    const comment = QuestionComment.create({
      authorId: new UniqueEntityId("akihito"),
      questionId: question.id,
      content: "hello",
    });

    await inMemoryQuestionCommentsRepository.create(comment)

   const questionComment = await sut.execute({
    authorId: "neymar",
    commentId: comment.id.toString(),
  })

  expect(questionComment.isLeft()).toBeTruthy()
  expect(questionComment.value).instanceOf(NotAllowedError)
  })

})
