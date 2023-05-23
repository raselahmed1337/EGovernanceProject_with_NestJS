import { IsNotEmpty, IsString } from "class-validator";

export class BlogForm {   
   @IsNotEmpty()
   @IsString()
   blogtitle: string;

    @IsNotEmpty()
    @IsString()
    blogpost : string;

    doctorid: number;
}