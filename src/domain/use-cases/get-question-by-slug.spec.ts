import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { GetQuestionBySlug } from "./get-question-by-slug";
import { CreateQuestionUseCase } from "./create-question";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../entities/values-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let createQuestion : CreateQuestionUseCase;
let sut: GetQuestionBySlug;

describe("Get question by slug", () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)

  });

  it("Should be able get question by slug", async () => {

    const newQuestion = makeQuestion({
      slug : Slug.createFromText("example")
    })

    inMemoryQuestionsRepository.create(newQuestion); 

    const { question : questionBySlug } = await sut.execute(newQuestion.slug);

    expect(questionBySlug).toBeTruthy();
    expect(questionBySlug.slug).toEqual(newQuestion.slug)
    expect(questionBySlug.title).toEqual(newQuestion.title)
  })
})