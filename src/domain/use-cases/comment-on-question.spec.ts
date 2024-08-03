import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-respository"
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create question comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionCommentRepository, inMemoryQuestionsRepository)
  })

  it("Should be able create question comment", async () => {

    const question = makeQuestion();
    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: "Guilherme",
      content: "Hello, its me akihito"
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual("Hello, its me akihito")

  });
})