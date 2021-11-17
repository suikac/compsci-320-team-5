import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './Employee';
import { Referral } from './Referral';

@Entity('resume', { schema: 'aki' })
export class Resume {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('mediumblob', { name: 'file' })
  file: Buffer;

  @OneToMany(() => Employee, (employee) => employee.resume)
  employees: Employee[];

  @OneToMany(() => Referral, (referral) => referral.resume)
  referrals: Referral[];
}
