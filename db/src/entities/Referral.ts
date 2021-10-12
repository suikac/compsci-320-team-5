import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Resume } from "./Resume";
import { Employee } from "./Employee";
import { Position } from "./Position";

@Index("referral_employee_fk", ["employeeId"], {})
@Index("referral_position_fk", ["positionId"], {})
@Index("referral_resume_fk", ["resumeId"], {})
@Entity("referral", { schema: "aki" })
export class Referral {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("bigint", { name: "resume_id", nullable: true })
  resumeId: string | null;

  @Column("varchar", { name: "to_email", length: 255 })
  toEmail: string;

  @Column("longtext", { name: "description" })
  description: string;

  @Column("varchar", { name: "referee_name", nullable: true, length: 255 })
  refereeName: string | null;

  @Column("tinyint", {
    name: "is_internal",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isInternal: boolean | null;

  @Column("bigint", { name: "position_id" })
  positionId: string;

  @Column("int", { name: "employee_id" })
  employeeId: number;

  @ManyToOne(() => Resume, (resume) => resume.referrals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "resume_id", referencedColumnName: "id" }])
  resume: Resume;

  @ManyToOne(() => Employee, (employee) => employee.referrals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: Employee;

  @ManyToOne(() => Position, (position) => position.referrals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "position_id", referencedColumnName: "id" }])
  position: Position;
}
