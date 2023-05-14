import { Entity,Column,PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { DoctorEntity } from 'src/doctor/Entitys/doctorEntity/doctorentity.entity';

@Entity("doctorCampaign")
export class CampaignEntity{
@PrimaryGeneratedColumn()
id: number;

@Column()
campaignName : string;

@Column()
campaignSpeciality : string;

@Column()
campaignDate : string;

@Column()
campaignDescription : string;

@Column()
ageLimit : string;

@Column()
filename: string;

@ManyToOne(() => DoctorEntity, doctor => doctor.campaigns)
doctor: DoctorEntity

}