import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignEntity } from '../../Entitys/campaignEntity/campaignentity.entity';
import { CampaignForm } from 'src/doctor/DTOs/campaignDto/campaigndto.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private campaignRepo: Repository<CampaignEntity>,
  ) {}

  
async insertCampaign(mydto) {
  return this.campaignRepo.save(mydto);
  }


  getCampaignID(id): any {
    return this.campaignRepo.find({
      where: { id: id },
      relations: { doctor: true },
    });
  }





  async updateCampaignbyid(mydto: CampaignForm, id: any): Promise<any> {
    return this.campaignRepo.update(id, mydto);
  }
  
  
  getAllCampaigns(): any {
    return this.campaignRepo.find({ relations: { doctor: true } });
  }

  deleteCampaignByID(id): any {
    return this.campaignRepo.delete(id);
  }

}
