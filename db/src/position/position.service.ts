import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { REPL_MODE_STRICT } from "repl";
import { Position } from "src/entities/Position";
import { PositionRepository } from "./position.repository";
import { PositionTagRepository } from "./positionTag.repository";
import { TagRepository } from "./tag.repository";
import { getRepository } from "typeorm";

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(PositionRepository)
        private positionRepository: PositionRepository,
        private tagRepository: TagRepository,
        private positionTagRepository: PositionTagRepository
    ) {}

    public async test() {
        return "hello"
    }

    public async getPositionById(id: string): Promise<Position> {
        const position = await this.positionRepository
            .createQueryBuilder("Position")
            .where("id = :id", { id: parseInt(id) })
            .getOneOrFail();

        return position;
    }

    public async getAllPositions(): Promise<Position[]> {
        const positions = await this.positionRepository
            .createQueryBuilder('Position')
            .getMany()

        return positions
    }

    public async createPosition(data: Object) {
        const position = await this.positionRepository.save(data)
        return position
    }

    public async addTagToPosition(positionAddId: string, tag: Object) {
        const positionTag = await this.positionTagRepository.save({
            positionId: parseInt(positionAddId),
            tagId: parseInt(tag['id'])
        })
        return positionTag
    }

    public async getTagByName(name: string) {
        let tag = await this.tagRepository
            .createQueryBuilder("Tag")
            .where("name = :name", { id: parseInt(name) })
            .getOneOrFail();
        return tag
    }

    public async createTag(name: string) {
        const tag = await this.tagRepository.save({name: name})
        return tag
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