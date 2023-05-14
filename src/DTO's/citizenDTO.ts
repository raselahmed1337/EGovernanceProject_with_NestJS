import { IsNotEmpty,IsNumber,MaxLength,MinLength,Length,IsEmail,IsOptional } from "class-validator";
export class CitizenDTO{
    @IsNotEmpty({message:"Please Enter Id"})
    @IsNumber()
    id:Number;
    @IsNotEmpty({message:"Please Enter Your Name"})
    name:string;
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    @MaxLength(13,{message:"NID should not contain more than 13 characters"})
    @MinLength(10,{message:"NID should contain more than 9 characters"})
    nid:string;
    @Length(11,11,{message:"Please check your phone number"})
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    phoneNumber:string;
    @IsEmail()
    email:string;
}
export class CitizenLoginDTO{
    @Length(11,11,{message:"Please check your phone number"})
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    phoneNumber:string;
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    @MaxLength(13,{message:"NID should not contain more than 13 characters"})
    @MinLength(10,{message:"NID should contain more than 9 characters"})
    nid:string;
}
export class CitizenSignupDTO{
    @IsNotEmpty({message:"Please Enter Your Name"})
    name:string;
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    @MaxLength(13,{message:"NID should not contain more than 13 characters"})
    @MinLength(10,{message:"NID should contain more than 9 characters"})
    nid:string;
    @Length(11,11,{message:"Please check your phone number"})
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    phoneNumber:string;
    @IsEmail()
    email:string;

}
export class CitizenHistoryDTO{
    des:string;
    citizenId:number;

}
export class CitizenBioDTO{
    @IsOptional()
    @MaxLength(255)
    address:string;
    @IsOptional()
    @MaxLength(20)
    bloodGroup:string;
    @IsOptional()
    @MaxLength(3)
    age:number;
    @IsOptional()
    @MaxLength(10)
    gender:string;
    @IsOptional()
    @MaxLength(2)
    familyMembers:number;
    @IsOptional()
    @MaxLength(10)
    maritalStatus:boolean;
    @IsOptional()
    @MaxLength(100)
    jobDes:string;
    @IsOptional()
    @MaxLength(50)
    postoffice:string;
    @IsOptional()
    citizenId:number;
    @IsOptional()
    photoName:string;


}
export class FeedbackDTO{
    @IsNotEmpty()
    @MaxLength(200)
    feedback:string;
    @IsNotEmpty()
    citizenId:number;
}