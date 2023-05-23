import { DoctorEntity } from 'src/doctor/Entitys/doctorEntity/doctorentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("doctorAppointment")
export class DoctorAppoinmentEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;
  
  @Column()
  patientAge: string;
  
  @Column()
  patientGender: string;

  @Column()
  patientAppointmentDate: string;
  
  @Column()
  patientAppointmentTime: string;

  @Column()
  patientAddress: string;

  @Column()
  patientEmail: string;

  @Column()
  patientEmargencyContact: string;

  @Column()
  filename: string;

  @Column()
  doctorName: string;

  @Column()
  doctorEmail: string;

  doctorid: number;
  
  @ManyToOne(() => DoctorEntity, doctor => doctor.doctorAppointments)
  doctor: DoctorEntity

}