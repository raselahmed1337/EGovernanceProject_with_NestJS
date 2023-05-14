import {Body, Controller,Delete,Get,Param,Post, Put, Query,Req, UsePipes,ValidationPipe,Session,Patch, UseInterceptors} from "@nestjs/common";
import { CitizenService } from "../services/citizen.service";
import { CitizenBioDTO,CitizenLoginDTO ,CitizenSignupDTO, FeedbackDTO} from "src/DTO's/citizenDTO";
import {Request} from "express";
import { LoginService } from "src/Common/login.service";
import { MailDTO,sentMailDTO } from "src/DTO's/mailDTO";
import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, ParseIntPipe } from "@nestjs/common/pipes";
import { MailService } from "../services/mail.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UploadedFile, UseGuards } from "@nestjs/common/decorators";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { SessionGuard } from "src/Common/session.guard";



@Controller('citizen')
export class CitizenController{
  
    constructor(private  citizenService: CitizenService, private loginService: LoginService,private mailService: MailService){}

    @Put('/signup')
    @UsePipes(new ValidationPipe())
    citigenSignup(@Body()citizen:CitizenSignupDTO){
        return this.citizenService.citigenSignup(citizen);
        //return this.loginService.citigenSignup(citizen);
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async citizenLogin(@Body()loginInfo:CitizenLoginDTO,@Session()session){
        let tempdata:any;
        if(await this.loginService.citizenLogin(loginInfo)){
            tempdata =await this.loginService.citizenLogin(loginInfo);
            session.citizenId=tempdata;
            return tempdata;
            //return "Login Successful";
        }
        else{
            return "Please Check You NID and Phone Number";
        }
    }
    @Get('/profile')
    @UseGuards(new SessionGuard)
    myProfile(@Session()session){
        return this.citizenService.citizenProfile(session.citizenId);
    }


    @Put('/update')
    @UseGuards(new SessionGuard)
    updateProfile(@Body()profile:CitizenSignupDTO){
        return this.citizenService.updateProfile(profile);
    }

   @Put('/updatebio')
   @UseGuards(new SessionGuard)
    @UseInterceptors(FileInterceptor('file',
    {
        storage:diskStorage({
            destination:'./Uploads/citizenPhoto',
            filename:function(req,file,cb){
                cb(null,file.originalname+Date.now())
            }
        })
    }))
    updateBio(@Body()bio:CitizenBioDTO,@UploadedFile(new ParseFilePipe({
        validators:[
          new MaxFileSizeValidator({maxSize:500000}),
          new FileTypeValidator({fileType:'png|jpg|jpeg|'}),
        ],
}))file:Express.Multer.File,@Session()session){
        console.log(file);
        bio.photoName=file.originalname;
        return this.citizenService.updateBio(bio,session.citizenId);
    }
    /*
    @Put('/bio/:id')
    updateBio(@Body()bio:CitizenBioDTO,@Param('id',ParseIntPipe)id:number){
        return this.citizenService.updateBio(bio,id);
    }
*/
    @Delete('/delete/:id')
    @UseGuards(new SessionGuard)
    async deleteCitizen(@Param('id')id:number){
        const tempdata=await this.citizenService.deleteCitizen(id);
        if(tempdata.affected){
            return "citizen deleted successfully";
        }
    }
    @Get()
    getCitizen(){
        return this.citizenService.getCitizenData();
    }
    @Get('/signout')
    signout(@Session() session)
    {
      if(session.destroy())
      {
        return {message:"you are logged out"};
      }
      else
      {
        throw new UnauthorizedException("invalid actions");
      }
    }
//------------------------------------------------------------
//User can send mails to other Users
    @Post('/mail')
    @UsePipes(new ValidationPipe())
    sendMail(@Body()mail:sentMailDTO){
        return this.mailService.sendMail(mail)
    }

//MailBox return All sent and received mail informations
    @Get('/mailbox')
    mailbox(@Query('add')add:string){
        return this.mailService.mailbox(add);
    }
    @Delete('delete/:id')
    deleteMail(@Param('id')id:any){
        return this.mailService.deleteMail(id);
    }

    @Get('/mails')
    getMails(){
        return this.mailService.getMailData();
    }
//------------------------------------------------------------
    @Get('/history/:id')
    @UseGuards(new SessionGuard)
    getHistory(@Param('id',ParseIntPipe)id:number){
        return this.citizenService.getHistory(id);
    }
    @Post('/feedback')
    @UseGuards(new SessionGuard)
    addFeedback(@Body()feedback:any,@Session()session){
        feedback.citizenId=session.citizenId;
        return this.citizenService.addFeedback(feedback);
    }
    @Get('/displayFeedback')
    displayFeedback(){
        return this.citizenService.displayFeedback();
    }
    @Get('/printIDCard')
    @UseGuards(new SessionGuard)
    printIDCard(@Session()session){
        let idCard = session.citizenId;
        return this.citizenService.printIDCard(idCard);
    }
    //-------------------------------------------------
    @Get('campagins')
    getCampaign(){
        return this.citizenService.getCampaign();
    }
    @Post('/medicalData')
    @UseGuards(new SessionGuard)
    addMedicalInfo(@Body()medicalData,@Session() session){
        const id = session.citizenId;
        return this.citizenService.addMedicalInfo(medicalData,id);
    }
    @Get('/myMedicalData')
    @UseGuards(new SessionGuard)
    getMyMedicalData(@Session() session,@Body('password')password:string){
        const id = session.citizenId;
        return this.citizenService.getMyMedicalData(id,password);
    }



}