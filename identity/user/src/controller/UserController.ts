/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User.entity"

export class UserController {
    private userRepository: Repository<User> = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOneBy({
            id: request.params.id,
        });
    }

    async post(request: Request, response: Response, next: NextFunction) {
        request.body.id = undefined;
        return this.userRepository.save(request.body);
    }

    async put(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async patch(request: Request, response: Response, next: NextFunction) {
        if(request.params.id != null)
        {
            const objectToUpdate = await this.userRepository.findOneBy({ id: request.params.id })
            if(objectToUpdate != null)
            {
                return this.userRepository.update(objectToUpdate, request.body);
            }
        }
        return null;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const objectToRemove = await this.userRepository.findOneBy({ id: request.params.id })
        if(objectToRemove != null){
            return await this.userRepository.remove(objectToRemove);
        }
        return null;
    }
}