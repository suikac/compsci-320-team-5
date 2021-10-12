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
@Entity("employee", { schema: "aki" })
export class Employee {
  @Column("varchar", { name: "first_name", nullable: true, length: 255 })
  firstName: string | null;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "company_name", length: 255 })
  companyName: string;

  @Column("bigint", { name: "manager_id" })
  managerId: string;

  @Column("varchar", { name: "position_title", nullable: true, length: 255 })
  positionTitle: string | null;

  @Column("date", { name: "start_date", nullable: true })
  startDate: string | null;

  @Column("tinyint", { name: "is_manager", nullable: true, width: 1 })
  isManager: boolean | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("bigint", { name: "resume_id", nullable: true })
  resumeId: string | null;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "company_id" })
  companyId: number;

  @ManyToOne(() => Resume, (resume) => resume.employees, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "resume_id", referencedColumnName: "id" }])
  resume: Resume;

  @OneToMany(() => Position, (position) => position.manager)
  positions: Position[];

  @OneToMany(() => Referral, (referral) => referral.employee)
  referrals: Referral[];
}
