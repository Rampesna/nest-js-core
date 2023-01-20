import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "../Services/JwtService";
import ServiceResponse from "../Utils/ServiceResponse";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService) {
    }
    async use(request: Request, response: Response, next: NextFunction) {

        let authorization = request.headers["authorization"];

        if (!authorization) {
            return response.json(
                new ServiceResponse(
                    false,
                    "Unauthorized",
                    null,
                    401
                )
            );
        }

        let tokenFromHeader = authorization.split(" ")[1];

        if (!tokenFromHeader) {
            return response.json(
                new ServiceResponse(
                    false,
                    "Unauthorized",
                    null,
                    401
                )
            );
        }

        let getJwtToken = this.jwtService.verify(tokenFromHeader);

        console.log(getJwtToken);

        next();
    }
}

