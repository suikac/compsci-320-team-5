import {PrimaryGeneratedColumn, BaseEntity, Column, Entity} from 'typeorm'

@Entity()
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String

    @Column()
    email: string

    @Column({nullable: true})
    role: string
}