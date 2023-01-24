import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtModel } from "../Models/TypeOrm/JwtModel";
import { sign, verify } from "jsonwebtoken";

import { TypeOrmQueryService } from "@nestjs-query/query-typeorm";
import ServiceResponse from "../Utils/ServiceResponse";

@Injectable()
export class JwtService extends TypeOrmQueryService<JwtModel> {

    constructor(
        @InjectRepository(JwtModel)
        readonly jwtRepository: Repository<JwtModel>
    ) {
        super(jwtRepository, {
            useSoftDelete: true
        });
    }

    async create(
        tokenable_type: string,
        tokenable_id: string,
        expires_at?: Date
    ) {
        let token = sign({
            tokenable_type: tokenable_type,
            tokenable_id: tokenable_id,
            expires_at: expires_at
        }, process.env.JWT_SECRET);

        let jwtModel = new JwtModel();
        jwtModel.tokenable_type = tokenable_type;
        jwtModel.tokenable_id = tokenable_id;
        jwtModel.token = token;
        jwtModel.expires_at = expires_at;

        let createdJwt = await this.jwtRepository.save(jwtModel);

        return new ServiceResponse(
            true,
            "Created JWT",
            createdJwt,
            200
        );
    }

    verifyToken(
        token: string
    ) {
        let jwtToken = this.jwtRepository.findOne({
            where: {
                token: token
            }
        });

        if (jwtToken) {
            try {
                let verifiedToken = verify(token, process.env.JWT_SECRET);
                return new ServiceResponse(
                    true,
                    "Verified token",
                    verifiedToken,
                    200
                );
            } catch (e) {
                return new ServiceResponse(
                    false,
                    "Could not verify token",
                    null,
                    404
                );
            }
        } else {
            return new ServiceResponse(
                false,
                "Token is not valid",
                null,
                404
            );
        }
    }
}
