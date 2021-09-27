import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Employee } from "./Employee";
import { PositionTag } from "./PositionTag";
import { Referral } from "./Referral";

@Index("position_employee_fk", ["employeeId"], {})
@Entity("position", { schema: "aki" })
export class Position {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("longtext", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "min_year_experience", nullable: true })
  minYearExperience: number | null;

  @Column("int", { name: "salary", nullable: true })
  salary: number | null;

  @Column("bigint", { name: "employee_id", nullable: true })
  employeeId: string | null;

  @Column("tinyint", {
    name: "is_posted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isPosted: boolean | null;

  @Column("int", { name: "column_7", nullable: true })
  column_7: number | null;

  @ManyToOne(() => Employee, (employee) => employee.positions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: Employee;

  @OneToMany(() => PositionTag, (positionTag) => positionTag.position)
  positionTags: PositionTag[];

  @OneToMany(() => Referral, (referral) => referral.position)
  referrals: Referral[];
}
