import { IsNotEmpty } from "class-validator";

export class GetByIdRequest {
    @IsNotEmpty()
    readonly id: number;

    getId() {
        return this.id;
    }
}
