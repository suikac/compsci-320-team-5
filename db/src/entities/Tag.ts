import { Column, Entity, OneToMany } from "typeorm";
import { PositionTag } from "./PositionTag";

@Entity("tag", { schema: "aki" })
export class Tag {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => PositionTag, (positionTag) => positionTag.tag)
  positionTags: PositionTag[];
}
