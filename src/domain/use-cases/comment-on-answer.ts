
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answers-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFound } from "./errors/resource-not-found";

interface CreateAnswerCommentProps {
  authorId: string,
  answerId: string,
  content: string,
}

type CommentOnAnswerResponse = Either<ResourceNotFound, {
  comment : AnswerComment
}>

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
    private readonly answerRepository: AnswersRepository
  ) { }

  async execute({
    authorId,
    answerId,
    content,
  }: CreateAnswerCommentProps) : Promise<CommentOnAnswerResponse> {

    const answer = await this.answerRepository.findById(answerId);

    if(!answer) return left(new ResourceNotFound())

    const comment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(comment);

    return right({comment})
  }
}