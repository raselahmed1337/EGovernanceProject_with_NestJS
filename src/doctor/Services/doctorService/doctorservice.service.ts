import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from '../../Entitys/doctorEntity/doctorentity.entity';
import { DoctorForm } from '../../DTOs/doctorDto/doctorform.dto';
import * as bcrypt from 'bcrypt';
import { BlogEntity } from 'src/doctor/Entitys/blogEntity/blogentity.entity';
import { BlogForm } from 'src/doctor/DTOs/blogDto/blogdto.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
    private mailerService: MailerService,

    @InjectRepository(BlogEntity)
    private blogRepo: Repository<BlogEntity>

  ) {}
  

  //1
  getAllDoctor(): any {
    return this.doctorRepo.find();
  }

  //2
  getDoctorByID(id): any {
    return this.doctorRepo.findOneBy({ id });
  }

  //3
  getDoctorByName(qry): any {
    return this.doctorRepo.findOneBy({ name: qry.name });
  }
  //4
  getDoctorsBySpecialist(specialist: string): any {
    return this.doctorRepo.find({ where: { specialist } });
  }

  //5
  getDoctorsByCollege(collegeName: string): any {
    return this.doctorRepo.find({ where: { collegeName } });
  }

  //6
  getDoctorByEmail(email: string): any {
    return this.doctorRepo.findOne({ where: { email } });
  }

  //7
  getDoctorByPhoneNumber(phoneNumber: string): any {
    return this.doctorRepo.findOneBy({ phoneNumber });
  }
  //8
  insertDoctor(mydto: DoctorForm): any {
    const doctoraccount = new DoctorEntity();
    doctoraccount.name = mydto.name;
    doctoraccount.age = mydto.age;
    doctoraccount.collegeName = mydto.collegeName;
    doctoraccount.specialist = mydto.specialist;
    doctoraccount.phoneNumber = mydto.phoneNumber;
    doctoraccount.email = mydto.email;
    doctoraccount.password = mydto.password;
    return this.doctorRepo.save(doctoraccount);
  }

  //9
  updateDoctor(name, email): any {
    return this.doctorRepo.update({email: email},{name:name});
  }

  //10
  updateDoctorbyid(mydto: DoctorForm, id): any {
    return this.doctorRepo.update(id, mydto);
  }

  //11
  deleteDoctorbyid(id): any {
    return this.doctorRepo.delete(id);
  }

  //12
  // deleteAllDoctors(): any {
  //   return this.doctorRepo.delete({});
  // }

  //13
  async getAllDoctorsSortedByName(): Promise<any> {
    return this.doctorRepo.find({ order: { name: 'ASC' } });
  }

  //14
  async getTotalDoctors(): Promise<any> {
    return this.doctorRepo.count();
  }

  async updateDoctorByPhoneNumber(mydto: DoctorForm, phoneNumber: string): Promise<any> {
    const doctor = await this.doctorRepo.findOne({ where: { phoneNumber } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with phone number ${phoneNumber} not found`);
    }
    const updatedDoctor = Object.assign(doctor, mydto);
    return this.doctorRepo.save(updatedDoctor);
  }


  async signup(mydto){
    
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password= hassedpassed;
    return this.doctorRepo.save(mydto);
    }

    async checkEmailExists(email: string): Promise<boolean> {
      const doctor = await this.doctorRepo.findOne({ where: { email } });
      if (doctor) {
        throw new BadRequestException('Email already exists');
      }
      return false;
    }
    async checkDoctorByEmail(email: string): Promise<boolean> {
      const doctor = await this.doctorRepo.findOne({ where: {email} });
      return !!doctor; // Returns true if a doctor with the given email exists, false otherwise
    }

    async signin(mydto): Promise<any> {
    const doctor = await this.doctorRepo.findOne({ where: { email: mydto.email } });
    if (doctor) {
      const match = await bcrypt.compare(mydto.password, doctor.password); // Compare the hashed password with the provided password
      if (match) {
        return 1;
      }
    }
    return 0;
  }  	
   
    
    async sendEmail(mydata){
     return   await this.mailerService.sendMail({
            to: mydata.email,
            subject: mydata.subject,
            text: mydata.text, 
          });
    
    }

    //############### BLOG ############################
    
    getBlogByDoctorID(id):any {
      return this.doctorRepo.find({ 
              where: {id:id},
          relations: {
              blogs: true,
          },
       });
  }
  // async updateBlogByDoctorID(id: number, blog: BlogForm): Promise<any> {
  //   return this.blogRepo.update(id, blog);
  //}

}