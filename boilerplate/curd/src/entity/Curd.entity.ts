import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Curd {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined
}
