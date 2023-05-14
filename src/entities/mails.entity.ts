import { timeStamp } from "console";
import { type } from "os";
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, } from "typeorm";
import { Citizen } from "./citizens.entity";
//import { Citizen } from "./citizens.entity";

@Entity('chats')
export class Mail  {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type: 'varchar'})
    senderMail:string;
    @Column({type: 'varchar'})
    message:string;
    @Column({type: 'varchar'})
    receiverMail:string;
    @Column({nullable: false})
    citizenId:number;
    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP' , nullable:true})
    time:Date;
    @ManyToOne(()=>Citizen,(citizen)=>citizen.mails,{onDelete:'CASCADE'})
    citizen:Citizen;
}