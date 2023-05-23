import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { doctorController } from "../../Controllers/doctorController/doctor.controller";
import { DoctorService } from "../../Services/doctorService/doctorservice.service";
import { DoctorEntity } from "../../Entitys/doctorEntity/doctorentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { BlogService } from "src//doctor/Services/blogService/blogservice.service";
import { BlogEntity } from "src/doctor/Entitys/blogEntity/blogentity.entity";
import { CampaignService } from "src/doctor/Services/campaignService/campaignservice.service";
import { CampaignEntity } from "src/doctor/Entitys/campaignEntity/campaignentity.entity";
import { DoctorAppoinmentEntity } from "src/doctor/Entitys/appointmentEntity/appointmentEntity.entity";
import { AppointmentService } from "src/doctor/Services/appointmentService/appointmentService.service";


@Module({
imports: [MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
               port: 465,
               ignoreTLS: true,
               secure: true,
               auth: {
                   user: 'raselahmed1337@gmail.com',
                   pass: 'ztvjgchxvfcodewk'
               },
              }
  }), TypeOrmModule.forFeature([DoctorEntity,BlogEntity,CampaignEntity,DoctorAppoinmentEntity])],
controllers: [doctorController],
providers: [DoctorService,BlogService,CampaignService,AppointmentService]

})

export class DoctorModule {}