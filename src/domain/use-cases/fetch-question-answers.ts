import { AnswersRepository, FindManyByQuestionIdParams } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";


export class FetchQuestionAnswers {

  constructor(
    private answersRepository : AnswersRepository,
    private questionsRepository : QuestionsRepository
  ) { }

  async execute({ questionId, params } : FindManyByQuestionIdParams) {

    const question = await this.questionsRepository.findById(questionId);

    if(!question) throw new Error("Question does not exists");

    const answers = await this.answersRepository.findManyByQuestionId({questionId, params});

    if(!answers) return []

    return answers;

  }
}