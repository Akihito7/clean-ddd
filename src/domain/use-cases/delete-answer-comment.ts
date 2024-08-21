import { Either, left, Left, right, Right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFound } from "./errors/resource-not-found";

interface DeleteAnswerCommentProps {
  authorId: string;
  commentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(private readonly answerCommentRepository: AnswerCommentsRepository) { }

  async execute({
    authorId,
    commentId
  }: DeleteAnswerCommentProps): Promise<Either<NotAllowedError | ResourceNotFound, {}>> {

    const comment = await this.answerCommentRepository.findById(commentId);
    
    if (!comment) {
      return left(new ResourceNotFound())
    };

    if (authorId != comment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(comment);

    return right({})
  }
}