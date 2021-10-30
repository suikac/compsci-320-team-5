import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './Tag';
import { Position } from './Position';

@Index('position_fk', ['positionId'], {})
@Index('tag_fk', ['tagId'], {})
@Entity('position_tag', { schema: 'aki' })
export class PositionTag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'position_id' })
  positionId: number;

  @Column('int', { name: 'tag_id' })
  tagId: number;

  @ManyToOne(() => Tag, (tag) => tag.positionTags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;

  @ManyToOne(() => Position, (position) => position.positionTags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'position_id', referencedColumnName: 'id' }])
  position: Position;
}
