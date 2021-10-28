import { Controller, HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PositionService } from "./position.service";

@Controller("Position")
export class PositionController {

    constructor(
        @Inject(PositionService)
        private positionService: PositionService
    ) {}




    // Matt Cappucci
    // Test route to see if connection to DB is working
    @MessagePattern({ cmd: "test" })
    public async test() {
        return this.positionService.test()
    }





    // Matt Cappucci
    // Route for getting a position by its ID
    @MessagePattern({ cmd: "getPositionById" })
    public async getPositionById(@Payload('id') id: string) {
        const position = this.positionService.getPositionById(id)
            .catch(() => null)
        return position
    }




    @MessagePattern({ cmd: "getAllPositions" })
    public async getAllPositions() {
        const position = this.positionService.getAllPositions()
            .catch(() => null)
        return position
    }




    @MessagePattern({ cmd: 'getPositionsByManager' })
    public async getPositionsByManger(@Payload('id') id: string) {
        const positions = await this.positionService.getPositionsByManager(id)
            .catch(() => null)
        return positions
    }




    @MessagePattern({ cmd: "createPosition" })
    public async createPosition(data: Object) {
        let tags = data['tags']
        delete data['tags']
        let position = await this.positionService.createPosition(data)
            .catch(() => null)
        if (position != null && tags != null && tags != undefined && tags.length > 0) {
            this.addTagsToPosition(position['id'], tags)
        }
        return position
    }




    @MessagePattern({ cmd: "updatePosition" })
    public async updatePosition(data: Object) {
        let tags = data['tags']
        delete data['tags']
        let id = data['id']
        delete data['id']
        let position = await this.positionService.updatePosition(id, data)
            .catch(() => null)
        if (position['affected'] != 1) {
            return null
        } else if (tags != null && tags != undefined) {
            this.positionService.deleteAllPositionTags(id)
            if (tags.length > 0) {
                this.addTagsToPosition(id, tags)
            }
        }
        return this.getPositionById(id)
    }




    @MessagePattern({ cmd: 'addTagsToPosition'})
    public async addTagsToPosition(
        @Payload('positionId') positionId: string,
        @Payload('tags') tags: string[]
    ) {
        console.log('in')
        for (let i = 0; i < tags.length; ++i) {
            let getTag = await this.positionService.getTagByName(tags[i])
                .catch(() => null)
                console.log(getTag)
            if (getTag == null) {
                console.log('creating tag')
                getTag = await this.positionService.createTag(tags[i])
            }
            console.log('about to add position tag')
            let positionTag = await this.positionService.addTagToPosition(positionId, getTag)
        }
        return 'works'
    }





    @MessagePattern({ cmd: 'deletePosition' })
    async deletePosition(@Payload('id') id: string) {
        this.positionService.deleteAllPositionTags(id)
        let position = await this.positionService.deletePosition(id)
        if (position['affected'] != 1) {
            return null
        }
        return id
    }
}