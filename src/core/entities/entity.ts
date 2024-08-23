import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<Props> {
    protected _id: UniqueEntityId;
    protected props: Props;

    constructor(props: Props, id?: string) {
        this._id = new UniqueEntityId(id);
        this.props = props
    }
}