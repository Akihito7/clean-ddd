import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { QuestionAttachmentsList } from "../entities/question-attachment-list";
import { QuestionAttachment } from "../entities/question-attachment";

type EditAnswerProps = {
  authorId: string,
  questionId: string,
  title: string,
  content: string,
  attachmentsIds: string[]
}
type EditQuestionUseCaseResponse = Either<ResourceNotFound | NotAllowedError, {}>
export class EditQuestionUseCase {

  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) { }

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds
  }: EditAnswerProps): Promise<EditQuestionUseCaseResponse> {

    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFound())

    if (authorId != question.authorId.toString()) return left(new NotAllowedError())

    const currentAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(question.id);

    const listWatchedCurrentAttachments = new QuestionAttachmentsList(currentAttachments);

    const updatedAttachments = attachmentsIds.map(id => (
      new QuestionAttachment({
        attachmentId: id,
        questionId: question.id
      })
    ));

    listWatchedCurrentAttachments.update(updatedAttachments)

    question.title = title;
    question.content = content;
    question.attchaments = listWatchedCurrentAttachments
    this.questionsRepository.save(question)

    return right({})
  }
}