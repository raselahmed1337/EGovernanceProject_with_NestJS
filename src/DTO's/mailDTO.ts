import { IsNotEmpty,IsEmail,Length,Validate } from "class-validator";
export class MailDTO{
    @IsNotEmpty({message:"Enter a valid id"})
    id:number;
    @IsEmail()
    @IsNotEmpty({message:"email should not be empty"})
    senderMail:string;
    @Length(1,300)
    message:string;
    @IsNotEmpty({message:"email should not be empty"})
    @IsEmail()
    receiverMail:string;
}
export class sentMailDTO{
    @IsEmail()
    @IsNotEmpty({message:"email should not be empty"})
    senderMail:string;
    @Length(1,300)
    message:string;
    @IsNotEmpty({message:"email should not be empty"})
    @IsEmail()
    receiverMail:string;
    @IsNotEmpty({message:"id should not be empty"})
    citizenId:number;
}