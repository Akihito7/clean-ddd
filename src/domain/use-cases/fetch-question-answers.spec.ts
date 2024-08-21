import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { FetchQuestionAnswers } from "./fetch-question-answers";
import { makeQuestion } from "test/factories/make-question";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswers;

describe("Fetch question answers", () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswers(inMemoryAnswersRepository, inMemoryQuestionsRepository)
  })

  it("Should be able order question answers by createAt", async () => {

    const newQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(newQuestion);

    const answerOne = makeAnswer({
      questionId : newQuestion.id,
      createdAt : new Date(2024,7,16)
    });

    const answerTwo = makeAnswer({
      questionId : newQuestion.id,
      createdAt : new Date(2024,7,20)
    });

    const answerThree = makeAnswer({
      questionId : newQuestion.id,
      createdAt : new Date(2024,7,18)
    });

    await inMemoryAnswersRepository.create(answerOne) 
    await inMemoryAnswersRepository.create(answerTwo)
    await inMemoryAnswersRepository.create(answerThree)

    const answers = await sut.execute({questionId : newQuestion.id.toString(), params : { page : 1}});
    
    if(answers.isRight()){
      const { value } = answers;
      expect(value[0].createdAt).toEqual(answerTwo.createdAt)
      expect(value[1].createdAt).toEqual(answerThree.createdAt)
      expect(value[2].createdAt).toEqual(answerOne.createdAt)
    }

  })


  it("Should be able fetch question answers", async () => {
    const newQuestion = makeQuestion({
      title: "Question main"
    });

    const questionTwo = makeQuestion({
      title: "This question doesn't matter"
    });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryQuestionsRepository.create(questionTwo);

    for (let i = 0; i < 20; i++) {
      const newAnswer = makeAnswer({
        questionId: newQuestion.id,
        content: `${i}`
      })

      const newAnswerTwo = makeAnswer({
        questionId: questionTwo.id,
        content: `${i}`
      })

      await inMemoryAnswersRepository.create(newAnswer)
      await inMemoryAnswersRepository.create(newAnswerTwo)
    }

    const answers = await sut.execute({ questionId: newQuestion.id.toString(), params: { page: 1 } });

    if(answers.isRight()){
      const { value } = answers;
      for (let i = 0; i < value.length; i++) {
        expect(value[i].questionId.toString()).toEqual(newQuestion.id.toString())
      }
    }
  })
})