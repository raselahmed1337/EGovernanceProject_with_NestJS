import{Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginService } from "src/Common/login.service";
import { Campagin } from "src/entities/campagin.entity";
import { CitizenBio } from "src/entities/citizenBio.entity";
import { CitizenMedicalData } from "src/entities/citizenMedicalReport.entity";
import { Citizen } from "src/entities/citizens.entity";
import { Feedback } from "src/entities/feedback.entity";
import { CitizenHistory } from "src/entities/history.entity";
import { Mail } from "src/entities/mails.entity";
import { CitizenController } from "../controllers/citizen.controller";
import { CitizenService } from "../services/citizen.service";
import { MailService } from "../services/mail.service";

@Module({
    imports: [TypeOrmModule.forFeature([Citizen,Mail,CitizenHistory,CitizenBio,Feedback,Campagin,CitizenMedicalData])],
    controllers:[CitizenController],
    providers:[CitizenService,LoginService,MailService]
})
export class CitizenModule {}