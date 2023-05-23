import {  Body,  Controller,  Delete,  FileTypeValidator,  Get,  MaxFileSizeValidator,  Param,  ParseFilePipe,  ParseIntPipe,  Patch,  Post,  Put,  Query,  Res,  Session,  UnauthorizedException,  UploadedFile,  UseGuards,  UseInterceptors,  UsePipes,  ValidationPipe,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BlogForm } from '../../DTOs/blogDto/blogdto.dto';
import { BlogService } from '../../Services/blogService/blogservice.service';
import { DoctorForm } from '../../DTOs/doctorDto/doctorform.dto';
import { DoctorService } from '../../Services/doctorService/doctorservice.service';
import { SessionGuard } from '../../Guards/session.guard';
import { BlogEntity } from 'src/doctor/Entitys/blogEntity/blogentity.entity';
import { CampaignService } from 'src/doctor/Services/campaignService/campaignservice.service';
import { CampaignForm } from 'src/doctor/DTOs/campaignDto/campaigndto.dto';
import { AppointmentForm } from 'src/doctor/DTOs/appointmentDto/appointmentDto.dto';
import { AppointmentService } from 'src/doctor/Services/appointmentService/appointmentService.service';
import { BadRequestException } from '@nestjs/common';

@Controller('doctor')
export class doctorController {
  constructor(
    private doctorService: DoctorService,
    private blogService: BlogService,
    private campaignService : CampaignService,
    private appointmentService : AppointmentService,
  ) {}

  //1
  @Get('/alldoctors')
  getAllDoctor(): any {
    return this.doctorService.getAllDoctor();
  }

  //2
  @Get('/finddoctor/:id')
  getdoctorByID(@Param('id', ParseIntPipe) id: string): any {
    return this.doctorService.getDoctorByID(id);
  }

  //3
  @Get('finddoctorbyname')
  async getDoctorByName(
    @Query('name') name: string,
  ): Promise<any> {
    const doctor = await this.doctorService.getDoctorByName({name});
    if (!doctor) {
      return { message: 'No doctor found with the given name.' };
    }
    return doctor;
  }

  //4
  @Get('specialist')
  async getDoctorsBySpecialist(
    @Param('specialist') specialist: string,
  ): Promise<any> {
    const doctors = await this.doctorService.getDoctorsBySpecialist(specialist);
    if (!doctors || doctors.length === 0) {
      return 'No doctors found for the given specialist.';
    }
    return doctors;
  }
  //5
  @Get('college/:collegeName')
  getDoctorsByCollege(@Param('collegeName') collegeName: string): Promise<any> {
    return this.doctorService.getDoctorsByCollege(collegeName);
  }
  //6
  @Get('email/:email')
  async getDoctorByEmail(@Param('email') email: string): Promise<any> {
    const doctor = await this.doctorService.getDoctorByEmail(email);
    if (!doctor) {
      return { message: 'No doctor found with the given email.' };
    }
    return doctor;
  }
  //7
  @Get('phone/:phoneNumber')
  async getDoctorByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<any> {
    const doctor = await this.doctorService.getDoctorByPhoneNumber(phoneNumber);
    if (!doctor) {
      return { message: 'No doctor found with the given phone number.' };
    }
    return doctor;
  }
  //8
  @Post('/insertdoctor')
  @UsePipes(new ValidationPipe())
  insertdoctor(@Body() mydto: DoctorForm): any {
    return this.doctorService.insertDoctor(mydto);
  }

  //9
  @Put('/updatedoctor')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async updatedoctor(
    @Session() session,
    @Body('name') name: string,
  ): Promise<any> {
    const result = await this.doctorService.updateDoctor(name, session.email);
    if (result.affected === 1) {
      return 'Record updated successfully';
    } else {
      return 'Record not found';
    }
  }

  //10
  @Put('/updateblog/:id')
  async updateBlogById(
    @Body() mydto: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const result = await this.blogService.updateBlogById(mydto, id);
    if (result.affected === 1) {
      return 'Blog updated successfully';
    } else {
      return 'Blog not found';
    }
    
  }
  

  //11
  @Delete('/deletedoctor/:id')
  async deletedoctorbyid(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const result = await this.doctorService.deleteDoctorbyid(id);
    if (result.affected === 1) {
      return 'Record ' + id + ' deleted successfully';
    } else {
      return 'Record not found';
    }
  }
  //12
  // @Delete('deletealldoctor')
  // deleteAllDoctors(): Promise<any> {
  //   return this.doctorService.deleteAllDoctors();
  // }

  //13
  @Get('doctorsbyname')
  async getAllDoctorsSortedByName(): Promise<any> {
    return this.doctorService.getAllDoctorsSortedByName();
  }

  //14
  @Get('totaldoctors')
  async getTotalDoctors(): Promise<any> {
    const total = await this.doctorService.getTotalDoctors();
    return total;
  }

  //15
  @Patch('phoneNumber/:phoneNumber')
  async updateDoctorByPhoneNumber(
    @Body() mydto: DoctorForm,
    @Param('phoneNumber') phoneNumber: string,
  ) {
    const doctor = await this.doctorService.updateDoctorByPhoneNumber(
      mydto,
      phoneNumber,
    );
    return { message: 'Doctor updated successfully', doctor };
  }

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploadsDoctor',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async signup(
    @Body() mydto: DoctorForm,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 16000000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.doctorService.checkEmailExists(mydto.email);
    mydto.filename = file.filename;

    return this.doctorService.signup(mydto);
    //console.log(file)
  }

  @Post('signin')
  async signIn(
    @Session() session,
    @Body() mydto: DoctorForm,
    @Body() { email, password }: { email: string; password: string },
  ): Promise<any> {
    const doctor = await this.doctorService.signin(mydto);
    if (doctor) {
      return { message: 'You have successfully signed in' };
    } else {
      return { message: 'Invalid email or password' };
    }
  }

  @Get('signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
  }

  @Post('sendmail')
  sendEmail(@Body() mydata) {
    return this.doctorService.sendEmail(mydata);
  }


  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name,{ root: './uploadsDoctor' })
  }


  //########################### Blog Part ###################################

  @Post('/insertblog')
  @UsePipes(new ValidationPipe())
    insertBlog(@Body() blogdto: BlogForm): BlogEntity {
      return this.blogService.insertBlog(blogdto);
    }

    @Put('/updatedoctor/:id')
    @UsePipes(new ValidationPipe())
    async updatedoctorbyid(
      @Body() mydto: DoctorForm,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
      const result = await this.doctorService.updateDoctorbyid(mydto, id);
      if (result.affected === 1) {
        return 'Record updated successfully';
      } else {
        return 'Record not found';
      }
    }
    

  @Get('/findblogsbydoctor/:id')
  getBlogByDoctorID(@Param('id', ParseIntPipe) id: number): any {
    return this.doctorService.getBlogByDoctorID(id);
  }

  @Get('/finddoctorbyblog/:id')
  getDoctorByBlogID(@Param('id', ParseIntPipe) id: number): any {
    return this.blogService.getDoctorByBlogID(id);
  }


  @Delete('/deleteblog/:id')
deleteBlogByID(@Param('id', ParseIntPipe) id: number): any {
  return this.blogService.deleteBlogByID(id);
}

@Get('allBlogs')
getAllBlogs():any{
  return this.blogService.getAllBlogs();
}


  //########################### Campaign Part ###################################
  @Post('insertCampaign')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploadsDoctorCampaign',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async insertCampaign(
    @Body() mydto: CampaignForm,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 16000000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;
    console.log(mydto);
    return this.campaignService.insertCampaign(mydto);
  }


  @Get('/findCampaignById/:id')
  getCampaignByID(@Param('id', ParseIntPipe) id: number): any {
    return this.campaignService.getCampaignID(id);
  }


  @Put('/updatecampaign/:id')
  @UsePipes(new ValidationPipe())
  async updatecampaignyid(
    @Body() mydto: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const result = await this.campaignService.updateCampaignbyid(mydto, id);
    if (result.affected === 1) {
      return 'Record updated successfully';
    } else {
      return 'Record not found';
    }
  }


  @Get('allCampaigns')
getAllCampaigns():any{
  return this.campaignService.getAllCampaigns();
}

@Get('/getcampaignimage/:name')
getCampaignImages(@Param('name') name, @Res() res) {
  res.sendFile(name,{ root: './uploadsDoctorCampaign' })
}


@Delete('/deleteCampaign/:id')
deleteCampaignByID(@Param('id', ParseIntPipe) id: number): any {
  return this.campaignService.deleteCampaignByID(id);
}




  //########################### Make Doctor Appoinment Part ###################################
  @Post('makeAppointment')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploadsMakeAppointment',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async makeAppointment(
    @Body() mydto: AppointmentForm,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 16000000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;
     // Check if the doctor's email exists in the doctor table
  const doctorExists = await this.doctorService.checkDoctorByEmail(mydto.doctorEmail);
  if (!doctorExists) {
    throw new BadRequestException('Invalid doctor email');
  }
    console.log(mydto);
    return this.appointmentService.makeAppointment(mydto);
  }

  @Get('/findAppointmentByID/:id')
  getAppointmentByID(@Param('id', ParseIntPipe) id: number): any {
    return this.appointmentService.getAppointmentID(id);
  }


@Get('allAppointments')
getAllAppointments():any{
  return this.appointmentService.getAllAppointments();
}

@Get('/getPatientsImage/:name')
getPatientsImage(@Param('name') name, @Res() res) {
  res.sendFile(name,{ root: './uploadsMakeAppointment' })
}

@Delete('/deleteAppointment/:id')
deleteAppointmentByID(@Param('id', ParseIntPipe) id: number): any {
  return this.appointmentService.deleteAppointmentByID(id);
}


}