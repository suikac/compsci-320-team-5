import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Tag } from "./Tag";
import { Position } from "./Position";

@Index("position_fk", ["positionId"], {})
@Index("tag_fk", ["tagId"], {})
@Entity("position_tag", { schema: "aki" })
export class PositionTag {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("bigint", { name: "position_id" })
  positionId: string;

  @Column("bigint", { name: "tag_id" })
  tagId: string;

  @ManyToOne(() => Tag, (tag) => tag.positionTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;

  @ManyToOne(() => Position, (position) => position.positionTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "position_id", referencedColumnName: "id" }])
  position: Position;
}
