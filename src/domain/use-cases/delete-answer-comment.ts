import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentProps {
  authorId: string;
  commentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(private readonly answerCommentRepository: AnswerCommentsRepository) { }

  async execute({
    authorId,
    commentId
  }: DeleteAnswerCommentProps) {

    const comment = await this.answerCommentRepository.findById(commentId);

    if(!comment) throw new Error("Comment does not found");

    if(authorId != comment.authorId.toString()) throw new Error("Not authorized");

    await this.answerCommentRepository.delete(comment);
  }
}