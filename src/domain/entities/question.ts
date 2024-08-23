import { AggregateRoot } from "@/core/entities/aggregate-root";
import { Slug } from "./values-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId,
  title: string;
  slug: Slug;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
  
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: string
  ) {
    const question = new Question({
      ...props,
      createdAt: props.createdAt ? props.createdAt :  new Date(),
      slug: props.slug ?? Slug.createFromText(props.title)
    })
    return question;
  }


  get id() {
    return this._id;
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId(): UniqueEntityId | undefined {
    return this.props.bestAnswerId;
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch()
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get slug() {
    return this.props.slug;
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    return this.props.updatedAt = new Date()
  }
}





