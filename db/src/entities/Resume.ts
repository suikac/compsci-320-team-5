import { Column, Entity, OneToMany } from "typeorm";
import { Employee } from "./Employee";
import { Referral } from "./Referral";

@Entity("resume", { schema: "aki" })
export class Resume {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("mediumblob", { name: "file" })
  file: Buffer;

  @OneToMany(() => Employee, (employee) => employee.resume)
  employees: Employee[];

  @OneToMany(() => Referral, (referral) => referral.resume)
  referrals: Referral[];
}
