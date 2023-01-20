import { IsNotEmpty } from "class-validator";

export class LoginRequest {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
