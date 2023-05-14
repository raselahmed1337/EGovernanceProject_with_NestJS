import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogEntity } from '../../Entitys/blogEntity/blogentity.entity';
import { BlogForm } from 'src/doctor/DTOs/blogDto/blogdto.dto';
import { CampaignForm } from 'src/doctor/DTOs/campaignDto/campaigndto.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepo: Repository<BlogEntity>,
  ) {}

  insertBlog(mydto): any {
    return this.blogRepo.save(mydto);
  }

  deleteBlogByID(id): any {
    return this.blogRepo.delete(id);
  }

  getAllBlogs(): any {
    return this.blogRepo.find({ relations: { doctor: true } });
  }

  getDoctorByBlogID(id): any {
    return this.blogRepo.find({
      where: { id: id },
      relations: { doctor: true },
    });
  }



  async updateBlogById(mydto: BlogForm, id: any): Promise<any> {
    return this.blogRepo.update(id, mydto);
  }
  

   
}
