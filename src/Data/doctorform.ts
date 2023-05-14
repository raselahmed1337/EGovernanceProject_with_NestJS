import { IsNotEmpty, IsInt, Length, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class DoctorForm {   
   
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    age : number;

    @IsNotEmpty()
    collegeName : string;
    
    @IsNotEmpty()
    specialist : string;
    
    @MaxLength(11)
    phoneNumber : string;

    @IsEmail() 
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    @MaxLength(16)
    @IsNotEmpty()
    password: string;
 
    @IsString()
    blog: string;

    @IsNotEmpty()
    role: string;

    profilpic : string;


}
