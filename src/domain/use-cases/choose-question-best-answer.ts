import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";


interface ChooseQuestionBestAnswerProps {
  answerId : string;
  authorId : string;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) { }

  async execute({ authorId, answerId } : ChooseQuestionBestAnswerProps) {

    const answer = await this.answerRepository.findById(answerId)

    if(!answer) throw new Error("Answer not found!")

    const question = await this.questionRepository.findById(answer.questionId.toString());

    if(!question) throw new Error("Question not found!")

    if(question.authorId.toString() != authorId) throw new Error("Not allowed");

    question.bestAnswerId = answer.id;

    this.questionRepository.save(question);
  } 
}