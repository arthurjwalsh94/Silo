import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  filePath: string; // or fileUrl if using S3
}