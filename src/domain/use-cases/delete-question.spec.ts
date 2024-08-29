import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { QuestionAttachment } from "../entities/question-attachment";
import { QuestionAttachmentsList } from "../entities/question-attachment-list";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentRepository : InMemoryQuestionAttachmentsRepository
let sut: DeleteQuestionUseCase;

describe("delete question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository;
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentRepository)
  })
  it("Should be able delete a qustion", async () => {
    const newQuestion = makeQuestion();
    inMemoryQuestionsRepository.create(newQuestion);
    
    const attachemnts = []
    for(let i = 0; i < 2; i++){
      attachemnts.push(new QuestionAttachment({
        attachmentId : String(i),
        questionId : newQuestion.id
      }))

      inMemoryQuestionAttachmentRepository.items.push(new QuestionAttachment({
        attachmentId : String(i),
        questionId : newQuestion.id
      }))
    }
    const attachmentList = new QuestionAttachmentsList(attachemnts);
    newQuestion.attchaments = attachmentList;
    const findQuestionById = await inMemoryQuestionsRepository.findById(newQuestion.id.toString())
    if(!findQuestionById) return;
    sut.execute(newQuestion);
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    expect(inMemoryQuestionAttachmentRepository.items).toHaveLength(0)
  
  })
})