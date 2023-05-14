import { Entity ,Column,PrimaryGeneratedColumn,ManyToOne} from "typeorm";
import { Citizen } from "./citizens.entity";
@Entity('citizenHistory')
export class CitizenHistory{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'varchar',nullable:false})
    des:string;
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP',nullable:false})
    time:Date;
    @Column({nullable:false})
    citizenId: number;
    @ManyToOne(()=>Citizen,(citizen)=>citizen.history,{nullable:false})
    citizen:Citizen;
}