import {PrimaryGeneratedColumn, BaseEntity, Column, Entity} from 'typeorm'

@Entity()
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: String

    @Column()
    last_name: string

    @Column()
    email: string
    
    @Column()
    company_name: string

    @Column()
    manager_id: string

    @Column()
    position_title: string

    @Column()
    start_date: Date

    @Column()
    is_manager: boolean

    @Column()
    password: string

    @Column()
    resume_id: string
}