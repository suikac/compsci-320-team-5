import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Resume } from "./Resume";
import { Employee } from "./Employee";
import { Position } from "./Position";

@Index("referee_employee_fk", ["refereeId"], {})
@Index("referral_employee_fk", ["referrerId"], {})
@Index("referral_position_fk", ["positionId"], {})
@Index("referral_resume_fk", ["resumeId"], {})
@Entity("referral", { schema: "aki" })
export class Referral {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "resume_id", nullable: true })
  resumeId: number | null;

  @Column("varchar", { name: "referee_email", length: 255 })
  refereeEmail: string;

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

  @Column("int", { name: "position_id" })
  positionId: number;

  @Column("int", { name: "referee_id", nullable: true })
  refereeId: number | null;

  @Column("int", { name: "referrer_id" })
  referrerId: number;

  @Column("boolean", {name: "is_read"})
  isRead: boolean | null;

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
  @JoinColumn([{ name: "referrer_id", referencedColumnName: "id" }])
  referrer: Employee;

  @ManyToOne(() => Position, (position) => position.referrals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "position_id", referencedColumnName: "id" }])
  position: Position;

  @ManyToOne(() => Employee, (employee) => employee.referrals2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "referee_id", referencedColumnName: "id" }])
  referee: Employee;
}
