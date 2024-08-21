import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFound } from "./errors/resource-not-found";

interface CreateQuestionCommentProps {
  authorId: string,
  questionId: string,
  content: string,
}

type CommentOnQuestionResponse = Either<ResourceNotFound, {
  comment : QuestionComment
}>
export class CommentOnQuestionUseCase {

  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
    private readonly questionRepository : QuestionsRepository
  ) { }

  async execute({
    authorId,
    questionId,
    content,
  }: CreateQuestionCommentProps) : Promise<CommentOnQuestionResponse> {

    const question = await this.questionRepository.findById(questionId);

    if(!question) return left(new ResourceNotFound())

    const comment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content: content,
    });

    await this.questionCommentsRepository.create(comment);

    return right({comment})
  }
}