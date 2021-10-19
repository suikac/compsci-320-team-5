import { Controller, HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PositionService } from "./position.service";

@Controller("Position")
export class PositionController {
    constructor(
        @Inject(PositionService)
        private positionService: PositionService
    ) {}

    @MessagePattern({ cmd: "test" })
    public async test() {
        return this.positionService.test()
    }

    @MessagePattern({ cmd: "getPositionByTitle" })
    getPositionByTitle(@Payload("title") title: string) {
        console.log("in db");
        const position = this.positionService.getPositionByTitle(title);
        console.log(position);
        if (!position) {
        console.log("in exception branch");
        throw new HttpException(
                {
                    STATUS_CODES: 404,
                    error: "Employee Not Founded",
                },
                HttpStatus.NOT_FOUND
            );
        } else {
            return position;
        }
    }

    @MessagePattern({ cmd: "createPosition" })
    async createPosition(
        @Payload("title") title: string,
        @Payload("description") description: string
    ) {
        this.positionService.createPosition(title, description);
        return "ok";
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