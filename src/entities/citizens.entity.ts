import {Entity,PrimaryGeneratedColumn,Column,OneToMany, OneToOne } from 'typeorm';
import { CitizenBio } from './citizenBio.entity';
import { CitizenMedicalData } from './citizenMedicalReport.entity';
import { CitizenHistory } from './history.entity';
import { Mail } from './mails.entity';
@Entity('citizens')
//import {Mail} from './mails.entity';
export class Citizen  {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type: 'varchar'})
    name:string;
    @Column({type: 'varchar'})
    nid:string;
    @Column({type: 'varchar'})
    phoneNumber:string;
    @Column({type: 'varchar'})
    email:string;
    @OneToMany(()=>Mail, (mails)=>mails.citizen)
    mails:Mail[];
    @OneToMany(()=>CitizenHistory,(history)=>history.citizen)
    history:CitizenHistory[];
    @OneToOne(()=>CitizenBio,(bio)=>bio.citizen)
    bio:CitizenBio;
    @OneToMany(()=>CitizenMedicalData,(MedicalData)=>MedicalData.citizen)
    MedicalData:CitizenHistory[];
}
