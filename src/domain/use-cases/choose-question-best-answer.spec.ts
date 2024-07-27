import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;;
let sut: ChooseQuestionBestAnswerUseCase
describe("Choose question best answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository);
  })

  it("Should be able choose question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId("neymar")
    })

    await inMemoryQuestionsRepository.create(question);

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: "neymar",
      answerId: answer.id.toString()
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      bestAnswerId: answer.id
    })

  })

  it("Should dont be able another user choose question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId("neymar")
    })

    await inMemoryQuestionsRepository.create(question);

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryAnswersRepository.create(answer);

    expect(() => {
       return sut.execute({
        authorId: "ronaldo",
        answerId: answer.id.toString()
      });
    }).rejects.toBeInstanceOf(Error)

  })
})