import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentProps {
  authorId: string;
  commentId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(private readonly questionCommentRepository: QuestionCommentsRepository) { }

  async execute({
    authorId,
    commentId
  }: DeleteQuestionCommentProps) {

    const comment = await this.questionCommentRepository.findById(commentId);

    if(!comment) throw new Error("Comment does not found");

    if(authorId != comment.authorId.toString()) throw new Error("Not authorized");

    await this.questionCommentRepository.delete(comment);
  }
}