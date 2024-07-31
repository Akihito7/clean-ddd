import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { FetchRecentesQuestions } from "./fetch-recents-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentesQuestions;

describe("fetch recents questions", () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentesQuestions(inMemoryQuestionsRepository);

  })

  it("Should be able order questions by createAt", async () => {
    const questionOne = makeQuestion({
      createdAt : new Date(2024,7,16)
    });

    const questionTwo = makeQuestion({
      createdAt : new Date(2024,7,20)
    });

    const questionThree = makeQuestion({
      createdAt : new Date(2024,7,18)
    });

    await inMemoryQuestionsRepository.create(questionOne)
    await inMemoryQuestionsRepository.create(questionTwo)
    await inMemoryQuestionsRepository.create(questionThree)

    const questions = await sut.execute({ page : 1 });

    expect(questions[0].createdAt).toEqual(questionTwo.createdAt)
    expect(questions[1].createdAt).toEqual(questionThree.createdAt)
    expect(questions[2].createdAt).toEqual(questionOne.createdAt)


  })

  it("Should be able get fetch recents questions", async () => {

    for (let i = 0; i < 32; i++) {
      const newQuestion = makeQuestion();
      await inMemoryQuestionsRepository.create(newQuestion);
    };
    const questions = await sut.execute({ page : 4});

    expect(questions).toHaveLength(2)
  })
})