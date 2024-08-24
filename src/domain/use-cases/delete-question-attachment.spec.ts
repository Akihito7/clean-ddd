import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"
import { DeleteQuestionAttachment } from "./delete-question-attachment";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-respository";
import { Question } from "../entities/question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Slug } from "../entities/values-objects/slug";
import { QuestionAttachment } from "../entities/question-attachment";
import { QuestionAttachmentsList } from "../entities/question-attachment-list";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository : InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository : InMemoryQuestionAttachmentsRepository;
let sut : DeleteQuestionAttachment

describe("test delete", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    sut = new DeleteQuestionAttachment(inMemoryQuestionAttachmentsRepository)
  })

  it("Should be able delete an attachment", async () => {
    const question = Question.create({
      authorId : new UniqueEntityId("akihito"),
      title : "how to delete",
      content : "nothing",
      slug : new Slug("how to delete"),
    })

    const attachments: QuestionAttachment[] = []
    for (let i = 0; i < 2; i++) {
      attachments.push(new QuestionAttachment({
        attachmentId: String(i),
        questionId: question.id
      }))
    }
    const attachmentsListWatched = new QuestionAttachmentsList(attachments);
    inMemoryQuestionAttachmentsRepository.items.push(...attachmentsListWatched.currentItems)
    question.attchaments = attachmentsListWatched;
    const attachmentForDelete = await inMemoryQuestionAttachmentsRepository.findUniqueByAttachmentId(new UniqueEntityId(attachments[1].attachmentId))
    await inMemoryQuestionAttachmentsRepository.deleteAttachmentById(new UniqueEntityId(attachmentForDelete.attachmentId));
    question.attchaments.remove(attachmentForDelete)
    expect(question.attchaments.currentItems).toHaveLength(1)
  })
})