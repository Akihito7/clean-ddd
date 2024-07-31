import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/entities/question";
import { Slug } from "@/domain/entities/values-objects/slug";
import { faker } from "@faker-js/faker"

export function makeQuestion(override : Partial<QuestionProps> = {}, id? : string) : Question{
    const title = faker.lorem.sentence();
    const question = Question.create({
      authorId : new UniqueEntityId(faker.lorem.word()),
      title,
      content : faker.lorem.text(),
      slug : new Slug(title),
      ...override,
    },id)
    return question;
}