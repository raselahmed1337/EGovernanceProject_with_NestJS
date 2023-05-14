import { IsNotEmpty, IsString,IsDate } from "class-validator";


export class CampaignForm {       
    @IsNotEmpty()
    @IsString()
    campaignName: string;

    @IsNotEmpty()
    @IsString()
    campaignSpeciality : string;

    @IsNotEmpty()
    @IsString()
    campaignDate : string;
    
    @IsNotEmpty()
    @IsString()
    campaignDescription : string;
    
    @IsNotEmpty()
    ageLimit : string;

    filename : string;

}