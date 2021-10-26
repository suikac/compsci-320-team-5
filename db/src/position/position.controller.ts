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




    @MessagePattern({ cmd: "createPosition" })
    public async createPosition(data: Object) {
        let tags = data['tags']
        delete data['tags']
        console.log(tags)
        let position = await this.positionService.createPosition(data)
            .catch(() => null)
        if (position != null && tags != null && tags != undefined && tags.length > 0) {
            this.addTagsToPosition(position['id'], tags)
        }
        return position
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





    @MessagePattern({ cmd: 'updatePosition' })
    async updatePosition(
        @Payload('id') id: string,
        @Payload('title') title: string
    ) {
        this.positionService.updatePosition(id, title)
        return 'ok'
    }

    @MessagePattern({ cmd: 'deletePosition' })
    async deletePosition(@Payload('id') id: string) {
        this.positionService.deletePosition(id)
        return 'ok'
    }
}