import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AppointmentForm{

    @IsNotEmpty()
    @IsString()
    patientName: string;

    @IsNotEmpty()
    @IsString()
    patientAge: string;

    @IsNotEmpty()
    @IsString()
    patientGender: string;

    @IsNotEmpty()
    @IsString()
    patientAppointmentDate: string;

    @IsNotEmpty()
    @IsString()
    patientAppointmentTime: string;

    @IsNotEmpty()
    @IsString()
    patientAddress: string;

    @IsNotEmpty()
    @IsEmail()
    patientEmail: string;

    @IsNotEmpty()
    @IsString()
    patientEmargencyContact: string;

    @IsNotEmpty()
    filename: string;

    @IsNotEmpty()
    @IsString()
    doctorName: string;

    @IsNotEmpty()
    @IsEmail()
    doctorEmail: string;

    doctorid: string;

}