
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answers-repository";

interface CreateAnswerCommentProps {
  authorId: string,
  answerId: string,
  content: string,
}

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
    private readonly answerRepository: AnswersRepository
  ) { }

  async execute({
    authorId,
    answerId,
    content,
  }: CreateAnswerCommentProps) {

    const answer = await this.answerRepository.findById(answerId);

    if(!answer) throw new Error("Answer does not found");

    const comment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(comment);

    return {
      comment
    }
  }
}