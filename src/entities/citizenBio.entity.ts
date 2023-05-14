import{Entity,Column,PrimaryGeneratedColumn,OneToOne,JoinColumn} from 'typeorm';
import { Citizen } from './citizens.entity';
@Entity('citizenBios')
export class CitizenBio{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    address: string;
  
    @Column({ nullable: true })
    bloodGroup: string;
  
    @Column({ nullable: true })
    age: number;
  
    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    familyMembers: number;
  
    @Column({ nullable: true })
    maritalStatus: boolean;
  
    @Column({ nullable: true })
    jobDes: string;
  
    @Column({ nullable: true })
    postoffice: string;

    @Column({ nullable: true })
    photoName: string;

    @Column({ nullable: false })
    citizenId:number;

    @OneToOne(()=>Citizen,(citizen)=>citizen.bio)
    @JoinColumn()
    citizen:Citizen;
}