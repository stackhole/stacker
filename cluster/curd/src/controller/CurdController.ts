/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Curd } from "../entity/Curd.entity"

export class CurdController {
    private curdRepository: Repository<Curd> = AppDataSource.getRepository(Curd)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.curdRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.curdRepository.findOneBy({
            id: request.params.id,
        });
    }

    async post(request: Request, response: Response, next: NextFunction) {
        request.body.id = undefined;
        return this.curdRepository.save(request.body);
    }

    async put(request: Request, response: Response, next: NextFunction) {
        return this.curdRepository.save(request.body);
    }

    async patch(request: Request, response: Response, next: NextFunction) {
        if(request.params.id != null)
        {
            const objectToUpdate = await this.curdRepository.findOneBy({ id: request.params.id })
            if(objectToUpdate != null)
            {
                return this.curdRepository.update(objectToUpdate, request.body);
            }
        }
        return null;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const objectToRemove = await this.curdRepository.findOneBy({ id: request.params.id })
        if(objectToRemove != null){
            return await this.curdRepository.remove(objectToRemove);
        }
        return null;
    }
}