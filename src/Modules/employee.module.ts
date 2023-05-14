import { EmployeeRepository } from './../Repository/employee.repository';
import { DoctorEntity } from './../Entity/doctorentity.entity';
import { SalaryEntity } from './../Entity/salaryentity.entity';
import { AdminEntity } from './../Entity/adminentity.entity';
import { EmployeeController } from '../Controller/employee.controller';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from 'src/Entity/employee.entity';
import { EmployeeService } from 'src/Services/employee.service';
import { AllUsersEntity } from 'src/Entity/allusers.signup.entity';
import { EmployeeEntity2 } from 'src/Entity/employee2.entity';
import { EmployeeService2 } from 'src/Services/employeeservice2.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Campagin } from 'src/entities/campagin.entity';
// import { ManagerService } from "src/manager/manager.service";
// import { ManagerEntity } from "src/manager/manager.entity";


@Module({
    imports: [MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   //ignoreTLS: false,
                   secure: true,
                   auth: {
                       user: 'islammasayekh@gmail.com',
                       pass: 'cvlvaspowjlvdxvu'
    },
    tls: {
      rejectUnauthorized: false,
                   }
                  }
}),EmployeeRepository, TypeOrmModule.forFeature([ EmployeeEntity, AdminEntity, AllUsersEntity, EmployeeEntity2, SalaryEntity, DoctorEntity,Campagin]) ],
    controllers: [EmployeeController],
    providers: [EmployeeService,EmployeeService2],
})

export class EmployeeModule {}