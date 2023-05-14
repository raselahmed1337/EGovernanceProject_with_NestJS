import {Entity,PrimaryGeneratedColumn,Column,OneToMany, OneToOne } from 'typeorm';
@Entity('feedbacks')
export class Feedback{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    feedback:string;
    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP' , nullable:true})
    date:Date;
    @Column()
    citizenId:number;
}