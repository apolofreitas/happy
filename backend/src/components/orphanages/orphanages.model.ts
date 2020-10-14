import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Image from '../images/images.model';

@Entity('orphanages')
export default class Orphanage extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];
}
