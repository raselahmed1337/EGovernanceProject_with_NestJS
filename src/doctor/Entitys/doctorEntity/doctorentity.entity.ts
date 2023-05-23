import { BlogEntity } from 'src/doctor/Entitys/blogEntity/blogentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CampaignEntity } from '../campaignEntity/campaignentity.entity';
import { DoctorAppoinmentEntity } from '../appointmentEntity/appointmentEntity.entity';

@Entity("doctors")
export class DoctorEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  age: number;

  @Column()
  collegeName : string;
  
  @Column()
  specialist : string;

  @Column()
  phoneNumber : string;

  @Column()
  email: string;

  @Column()
  password: string;

   @Column()
  filename: string;

  @OneToMany(() => BlogEntity, blog => blog.doctor)
  blogs: BlogEntity[];

  @OneToMany(() => CampaignEntity, campaign => campaign.doctor)
  campaigns: CampaignEntity[];

  @OneToMany(() => DoctorAppoinmentEntity, doctorAppointment => doctorAppointment.doctor)
  doctorAppointments: DoctorAppoinmentEntity[];
}
