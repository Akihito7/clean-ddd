import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment, QuestionCommentProps } from "@/domain/entities/question-comment";
import { faker } from "@faker-js/faker"

export function makeQuestionComment(override : Partial<QuestionCommentProps> = {}) : QuestionComment{

    const questionComment = QuestionComment.create({
      authorId : new UniqueEntityId(faker.lorem.word()),
      questionId : new UniqueEntityId(faker.lorem.word()),
      content : faker.lorem.text(),
      ...override,
    })

    return questionComment;
}