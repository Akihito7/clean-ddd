import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from "@/domain/entities/answer-comment";
import { faker } from "@faker-js/faker"

export function makeAnswerComment(override : Partial<AnswerCommentProps> = {}) : AnswerComment{

    const answerComment = AnswerComment.create({
      authorId : new UniqueEntityId(faker.lorem.word()),
      answerId : new UniqueEntityId(faker.lorem.word()),
      content : faker.lorem.text(),
      ...override,
    })

    return answerComment;
}