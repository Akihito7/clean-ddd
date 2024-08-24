import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { QuestionAttachment } from "../entities/question-attachment";
import { QuestionAttachmentsList } from "../entities/question-attachment-list";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("edit question", () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository)
  });

  it("Should be able edit question", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("ney"),
      title: "question one",
      content: "content question 1",
    });

    const attachments: QuestionAttachment[] = []
    for (let i = 0; i < 2; i++) {
      attachments.push(new QuestionAttachment({
        attachmentId: String(i),
        questionId: newQuestion.id
      }))
    }
    newQuestion.attchaments = new QuestionAttachmentsList(attachments);
    const updatedAttachments: QuestionAttachment[] = []

    for (let i = 0; i < 2; i++) {
      updatedAttachments.push(new QuestionAttachment({
        attachmentId: String(i + 10),
        questionId: newQuestion.id
      }))
    }
    newQuestion.attchaments.update(updatedAttachments);
    await inMemoryQuestionsRepository.create(newQuestion);

    expect(newQuestion.attchaments.currentItems).toEqual([
      expect.objectContaining( {attachmentId: "10"}),
      expect.objectContaining({ attachmentId: "11"})
    ])

    await sut.execute({
      authorId: "ney",
      questionId: newQuestion.id.toString(),
      title: "question one edit",
      content: "content question update",
      attachmentsIds: ['1', '2', '10']
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "question one edit",
      content: "content question update"
    })

  })

  it("Dont should be able edit question from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("ney"),
      title: "question one",
      content: "content question 1"
    });


    await inMemoryQuestionsRepository.create(newQuestion);
    const question = await sut.execute({
      authorId: "a",
      questionId: newQuestion.id.toString(),
      title: "question one edit",
      content: "content question update",
      attachmentsIds: ['1', '2', '10']
    })

    expect(question.isLeft()).toBeTruthy();
    expect(question.value).instanceOf(NotAllowedError)

  })

})
