import {Entity,PrimaryGeneratedColumn,Column,OneToMany, OneToOne } from 'typeorm';
// import { CitizenBio } from './citizenBio.entity';
// import { CitizenHistory } from './history.entity';
// import { Mail } from './mails.entity';
@Entity('campagins')
//import {Mail} from './mails.entity';
export class Campagin  {
    //[x: string]: any;
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    title:string;
    @Column({nullable:true})
    des:string;
    @Column({nullable:true})
    place:string;
    @Column({nullable:true})
    type:string;
        @Column({nullable:true})
    campaginInfo:string;


}
