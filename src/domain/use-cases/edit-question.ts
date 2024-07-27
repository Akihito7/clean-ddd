import { QuestionsRepository } from "../repositories/questions-repository";

type EditAnswerProps = {
  authorId: string,
  questionId: string,
  title: string,
  content: string,
}

export class EditQuestionUseCase {

  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ authorId, questionId, title, content }: EditAnswerProps) {

    const question = await this.questionsRepository.findById(questionId);

    if (!question) throw new Error("Answer not found");

    if (authorId != question.authorId.toString()) throw new Error("not allowed");

    question.title = title;
    question.content = content;

    this.questionsRepository.save(question)
  }
}