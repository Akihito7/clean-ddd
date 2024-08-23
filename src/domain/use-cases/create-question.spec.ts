import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  });
  it("Should be able create question", async () => {
    const question = await sut.execute({
      authorId: '1',
      title: 'How to play of riven',
      content: "any one help me play of riven,please",
      attachmentsIds: ["1", "2"]
    })

    expect(question.value?.title).toEqual("How to play of riven");
    expect(inMemoryQuestionsRepository.items[0]).toBeTruthy();
    expect(question.value?.attchaments.currentItems).toHaveLength(2);
    expect(question.value?.attchaments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: "1" }),
      expect.objectContaining({ attachmentId: "2" })
    ])
  })
})