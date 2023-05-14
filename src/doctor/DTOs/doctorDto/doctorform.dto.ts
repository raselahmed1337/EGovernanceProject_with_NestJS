import { IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from "class-validator";
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

    @IsEmail({}, { message: 'Invalid email address' })
    email: string;
    
    // @MinLength(8)
    // @MaxLength(15)
    // @IsNotEmpty()
    //@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, { message: 'Password too weak' })
    password: string;

    filename : string;

}