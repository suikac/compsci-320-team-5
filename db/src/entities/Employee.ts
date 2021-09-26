import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Resume } from "./Resume";
import { Position } from "./Position";
import { Referral } from "./Referral";

@Index("employee_resume_fk", ["resumeId"], {})
@Entity("employee", { schema: "aki" })
export class Employee {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "company_name", length: 255 })
  companyName: string;

  @Column("bigint", { name: "manager_id" })
  managerId: string;

  @Column("varchar", { name: "position_title", length: 255 })
  positionTitle: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("tinyint", { name: "is_manager", width: 1 })
  isManager: boolean;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("bigint", { name: "resume_id", nullable: true })
  resumeId: string | null;

  @ManyToOne(() => Resume, (resume) => resume.employees, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "resume_id", referencedColumnName: "id" }])
  resume: Resume;

  @OneToMany(() => Position, (position) => position.employee)
  positions: Position[];

  @OneToMany(() => Referral, (referral) => referral.employee)
  referrals: Referral[];
}
