import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorAppoinmentEntity } from "src/doctor/Entitys/appointmentEntity/appointmentEntity.entity";

@Module({
imports: [TypeOrmModule.forFeature([DoctorAppoinmentEntity])],
controllers: [],
providers: []

})

export class DoctorAppoinmentModule {}