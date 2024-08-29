import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { DeleteAnswerUseCase } from "./delete-answer";
import { Answer } from "../entities/answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachementsRepository } from "test/repositories/in-memory-answer-attachment-repository";
import { AnswerAttachment } from "../entities/answer-attachment";
import { AnswerAttachmentList } from "../entities/answer-attchament-list";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAttachmentsRepository : InMemoryAnswerAttachementsRepository;
let sut: DeleteAnswerUseCase;

describe("delete answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAttachmentsRepository = new InMemoryAnswerAttachementsRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository, inMemoryAttachmentsRepository)
  })

  it("Should be able delete a answer", async () => {

    const newAnswer = Answer.create({
      authorId : new UniqueEntityId("1"),
      content : "nothing",
      questionId : new UniqueEntityId("21"),
    });

    const attachmentOne = new AnswerAttachment({
      answerId : newAnswer.id.toString(),
      attachmentId : "1"
    })
    const attachmentTwo = new AnswerAttachment({
      answerId : newAnswer.id.toString(),
      attachmentId : "2"
    })
    
    const attachments = [];
    attachments.push(attachmentOne, attachmentTwo)
    inMemoryAttachmentsRepository.itens.push(attachmentOne, attachmentTwo)

    newAnswer.attachments = new AnswerAttachmentList(attachments);

    await inMemoryAnswersRepository.create(newAnswer);

    const findAnswerById = await inMemoryAnswersRepository.findById(newAnswer.id.toString())

    if(!findAnswerById) return;
    expect(inMemoryAnswersRepository.items).toHaveLength(1);
    expect(inMemoryAttachmentsRepository.itens).toHaveLength(2)

    await sut.execute({
      answerId : newAnswer.id.toString(),
      authorId : newAnswer.authorId.toString()
    });
    
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAttachmentsRepository.itens).toHaveLength(0)
  })
})