import { DoctorEntity } from 'src/doctor/Entitys/doctorEntity/doctorentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("blog")
export class BlogEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blogtitle: string;
  
  @Column()
  blogpost: string;

  @ManyToOne(() => DoctorEntity, doctor => doctor.blogs)
  doctor: DoctorEntity

}