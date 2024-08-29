import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeQuestion } from "test/factories/make-question"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed-error";
import { AnswerAttachment } from "../entities/answer-attachment";
import { AnswerAttachmentList } from "../entities/answer-attchament-list";


let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("edit question", () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  });

  it("Should be able edit question", async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("ney"),
      content: "content answer 1",
    });

    const attachments = []
    for (let i = 0; i < 2; i++) {
      attachments.push(new AnswerAttachment({
        answerId: newAnswer.id.toString(),
        attachmentId: String(i)
      }))
    }

    newAnswer.attachments = new AnswerAttachmentList(attachments)
    await inMemoryAnswersRepository.create(newAnswer);

    const updateAttachments = []
    for (let i = 0; i < 2; i++) {
      if (i === 1) {
        updateAttachments.push(new AnswerAttachment({
          answerId: newAnswer.id.toString(),
          attachmentId: String(i + 10)
        }))
      } else {
        updateAttachments.push(new AnswerAttachment({
          answerId: newAnswer.id.toString(),
          attachmentId: String(i)
        }))
      }
    }

    newAnswer.attachments.update(updateAttachments);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: "ney",
      content: "content answer 1 update"
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'content answer 1 update',
    });

    expect(newAnswer.attachments.getRemovedItems()).toEqual([
      expect.objectContaining({attachmentId : "1"})
    ])
    expect(newAnswer.attachments.getNewItems()).toEqual([
      expect.objectContaining({attachmentId : "11"})
    ])
    expect(newAnswer.attachments.currentItems).toEqual([
      expect.objectContaining( {attachmentId: "0"}),
      expect.objectContaining({ attachmentId: "11"})
    ])

  })

  it("Dont should be able edit answer from another user", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("ney"),
      content: "content answer",
    });

    await inMemoryAnswersRepository.create(newAnswer);

    const answer = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: "a",
      content: "content answer"
    });

    expect(answer.isLeft()).toBeTruthy();
    expect(answer.value).instanceOf(NotAllowedError)
  })

})
