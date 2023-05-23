import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitizenModule } from './citizen/modules/citizen.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AllUsersSignUpForm } from './Data/allusers.signupform';
//import { AdminEmployeeModule } from './Modules/AdminEmployee.module';
import { AdminModule } from './Modules/adminmodule.module';
import { EmployeeModule2 } from './Modules/employee2module.module';
import {EmployeeModule } from './Modules/employee.module';
import { BlogModule } from './doctor/Modules/blogModule/blogmodule.module';
import { DoctorModule } from './doctor/Modules/doctorModule/doctormodule.module';
import { CampaignModule } from './doctor/Modules/campaignModule/campaignmodule.module';
import { DoctorAppoinmentModule } from './doctor/Modules/doctorAppointmentModule/doctorAppointmentModule.module';

// //Localhost Configurations added here
// @Module({
//   imports: [CitizenModule,AdminModule,AllUsersSignUpForm,EmployeeModule2,EmployeeModule,BlogModule,CampaignModule,DoctorModule,DoctorAppoinmentModule,
//           TypeOrmModule.forRoot({type: 'postgres',
//           host: 'localhost',
//           port: 5432,
//           username: 'postgres',
//           password: 'root',
//           database: 'E_Governance',
//           autoLoadEntities: true,
//           synchronize: true,})],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



// //Railway app Configurations added here
@Module({
  imports: [CitizenModule,AdminModule,AllUsersSignUpForm,EmployeeModule2,EmployeeModule,BlogModule,CampaignModule,DoctorModule,
          TypeOrmModule.forRoot({type: 'postgres',
          host: 'containers-us-west-13.railway.app',
          port: 7329,
          username: 'postgres',
          password: 'sWJdvc7O6qr4whL1ta4f',
          database: 'railway',
          autoLoadEntities: true,
          synchronize: true,})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
