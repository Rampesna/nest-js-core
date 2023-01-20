import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import express from "express";
import ServiceResponse from "../Utils/ServiceResponse";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
    public catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse() as express.Response;
        response
            .status(422)
            .json(new ServiceResponse(
                false,
                "Unprocessable entity",
                exception.response.message,
                422
            ));
    }
}
