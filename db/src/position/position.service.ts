import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { REPL_MODE_STRICT } from "repl";
import { Position } from "src/entities/Position";
import { PositionRepository } from "./position.repository";
import { getRepository } from "typeorm";

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(PositionRepository)
        private positionRepository: PositionRepository
    ) {}

    public async test() {
        return "hello"
    }

    public async getPositionByTitle(title: string): Promise<Position> {
        const position = this.positionRepository
          .createQueryBuilder("Position")
          .where("title = :title", { title: title })
          .getOne();
    
        return position;
    }

    public async createPosition(title: string, description: string) {
        this.positionRepository
            .createQueryBuilder()
            .insert()
            .into("position")
            .values({
                title: title,
                description: description
            })
            .execute();
    }

    public async updatePosition(id: string, title: string) {
        this.positionRepository
            .createQueryBuilder()
            .update()
            .set({title: title})
            .where('id = :id', {id: id})
            .execute()
    }

    public async deletePosition(id: string) {
        this.positionRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', {id: id})
            .execute()
    }
}