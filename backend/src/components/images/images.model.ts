import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Orphanage from '../orphanages/orphanages.model';

@Entity('images')
export default class Image extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage;
}
