import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PositionTag } from './PositionTag';

@Entity('tag', { schema: 'aki' })
export class Tag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @OneToMany(() => PositionTag, (positionTag) => positionTag.tag)
  positionTags: PositionTag[];
}
