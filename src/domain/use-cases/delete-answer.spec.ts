import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { DeleteAnswerUseCase } from "./delete-answer";
import { Answer } from "../entities/answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("delete answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it("Should be able delete a answer", async () => {

    const newAnswer = Answer.create({
      authorId : new UniqueEntityId("1"),
      content : "nothing",
      questionId : new UniqueEntityId("21"),
    });

    await inMemoryAnswersRepository.create(newAnswer);

    const findAnswerById = await inMemoryAnswersRepository.findById(newAnswer.id.toString())

    if(!findAnswerById) return;

    expect(inMemoryAnswersRepository.items).toHaveLength(1);

    await sut.execute({
      answerId : newAnswer.id.toString(),
      authorId : newAnswer.authorId.toString()
    });
    
    expect(inMemoryAnswersRepository.items).toHaveLength(0)

  })
})