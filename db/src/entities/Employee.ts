import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Resume } from "./Resume";
import { Position } from "./Position";
import { Referral } from "./Referral";

@Index("employee_resume_fk", ["resumeId"], {})
@Entity()
export class Employee {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column("varchar", { name: "first_name", length: 255, default: null })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255, default: null })
  lastName: string;

  @Column("varchar", { name: "email", length: 255, default: null })
  email: string;

  @Column("varchar", { name: "company_name", length: 255, default: null })
  companyName: string;

  @Column("bigint", { name: "manager_id", default: null })
  managerId: string;

  @Column("varchar", { name: "position_title", length: 255, default: null })
  positionTitle: string;

  @Column("date", { name: "start_date", default: null })
  startDate: string;

  @Column("tinyint", { name: "is_manager", width: 1, default: null })
  isManager: boolean;

  @Column("varchar", { name: "password", length: 255, default: null })
  password: string;

  @Column("bigint", { name: "resume_id", nullable: true, default: null })
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
