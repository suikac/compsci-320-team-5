// Matt Cappucci - Created this file to parse input to position api

import { Injectable } from "@nestjs/common";

@Injectable()
export class PositionService {
    public parseInput(requestBody: Object, requiredFields: string[], otherFields: string[]) {
        let data = {}
        let requestBodyFields = Object.keys(requestBody)
        for (let i = 0; i < requiredFields.length; ++i) {
            if (!requestBodyFields.includes(requiredFields[i])) {
                return false
            } else {
                data[requiredFields[i]] = requestBody[requiredFields[i]]
            }
        }
        for (let i = 0; i < otherFields.length; ++i) {
            if (requestBodyFields.includes(otherFields[i])) {
                data[otherFields[i]] = requestBody[otherFields[i]]
            }
        }
        return data
    }
}