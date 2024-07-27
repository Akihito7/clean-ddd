import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/entities/question";
import { Slug } from "@/domain/entities/values-objects/slug";
import { faker } from "@faker-js/faker"

export function makeQuestion(override : Partial<QuestionProps> = {}, id? : string) : Question{
    const question = Question.create({
      authorId : new UniqueEntityId('1'),
      title : faker.lorem.sentence(),
      content : faker.lorem.text(),
      slug : new Slug('example'),
      ...override,
    },id)
    return question;
}