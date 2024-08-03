import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionCommentProps {
  authorId: string,
  questionId: string,
  content: string,
}

export class CommentOnQuestionUseCase {

  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
    private readonly questionRepository : QuestionsRepository
  ) { }

  async execute({
    authorId,
    questionId,
    content,
  }: CreateQuestionCommentProps) {

    const question = await this.questionRepository.findById(questionId);

    if(!question) throw new Error("Question does not found!")

    const comment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content: content,
    });

    await this.questionCommentsRepository.create(comment);

    return {
      comment
    }
  }
}