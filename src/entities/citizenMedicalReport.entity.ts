import { Entity ,Column,PrimaryGeneratedColumn,ManyToOne} from "typeorm";
import { Citizen } from "./citizens.entity";
@Entity('citizenMedicalData')
export class CitizenMedicalData{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'varchar',nullable:false})
    password: string;
    @Column({type:'varchar',nullable:true})
    issue:string;
    @Column({nullable:true})
    des:string;
    @Column({nullable:true})
    status:string;
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP',nullable:false})
    addedTime:Date;
    @Column({nullable:false})
    citizenId: number;
    @ManyToOne(()=>Citizen,(citizen)=>citizen.history,{nullable:false})
    citizen:Citizen;
}