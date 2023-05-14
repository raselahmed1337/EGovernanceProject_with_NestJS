import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("doctor")
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
  blog: string;

   @Column()
    filename: string;
    
    @Column()//-1 ->doctor
    role:number
}