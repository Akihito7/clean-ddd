import { randomUUID } from "crypto";
import { UniqueEntityId } from "./unique-entity-id";

export class Entity<Props> {
    private _id: UniqueEntityId;
    protected props: Props;

    constructor(props: Props, id?: string) {
        this._id = new UniqueEntityId(id);
        this.props = props
    }

    get id(): string {
        return this.id
    }
}