import { Either, left, right } from "@/core/either";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteQuestionCommentProps {
  authorId: string;
  commentId: string;
}

type DeleteQuestionCommentUseCaseResponse =  Either<ResourceNotFound | NotAllowedError , {}>
export class DeleteQuestionCommentUseCase {
  constructor(private readonly questionCommentRepository: QuestionCommentsRepository) { }

  async execute({
    authorId,
    commentId
  }: DeleteQuestionCommentProps) : Promise<DeleteQuestionCommentUseCaseResponse>{

    const comment = await this.questionCommentRepository.findById(commentId);

    if(!comment) return left(new ResourceNotFound())
    if(authorId != comment.authorId.toString()) return left(new NotAllowedError())

    await this.questionCommentRepository.delete(comment);

    return right({})
  }
}