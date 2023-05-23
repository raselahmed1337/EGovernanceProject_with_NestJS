import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorAppoinmentEntity } from 'src/doctor/Entitys/appointmentEntity/appointmentEntity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(DoctorAppoinmentEntity)
    private appointmentRepo: Repository<DoctorAppoinmentEntity>,
  ) {}

  
async makeAppointment(mydto:any) {
  return this.appointmentRepo.save(mydto);
  }


  getAppointmentID(id: number): any {
    return this.appointmentRepo.find({
      where: { id: id },
      relations: { doctor: true },
    });
  }





//   async updateCampaignbyid(mydto: CampaignForm, id: any): Promise<any> {
//     return this.campaignRepo.update(id, mydto);
//   }
  
  
  getAllAppointments(): any {
    return this.appointmentRepo.find({ relations: { doctor: true } });
  }

  deleteAppointmentByID(id): any {
    return this.appointmentRepo.delete(id);
  }

}
