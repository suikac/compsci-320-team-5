import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Employee } from "./Employee";
import { PositionTag } from "./PositionTag";
import { Referral } from "./Referral";

@Index("position_employee_fk", ["managerId"], {})
@Entity("position", { schema: "aki" })
export class Position {
    // Matt Cappucci - made this auto increment
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  /*@Column("bigint", { primary: true, name: "id" })
  id: string;*/

  @Column("longtext", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "min_year_experience", nullable: true })
  minYearExperience: number | null;

  @Column("int", { name: "salary", nullable: true })
  salary: number | null;

  @Column("tinyint", {
    name: "is_posted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isPosted: boolean | null;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("int", { name: "manager_id", nullable: true })
  managerId: number | null;

  @ManyToOne(() => Employee, (employee) => employee.positions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "manager_id", referencedColumnName: "id" }])
  manager: Employee;

  @OneToMany(() => PositionTag, (positionTag) => positionTag.position)
  positionTags: PositionTag[];

  @OneToMany(() => Referral, (referral) => referral.position)
  referrals: Referral[];
}
