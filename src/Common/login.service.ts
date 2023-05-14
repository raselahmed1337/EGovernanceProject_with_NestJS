import { Injectable,Session } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Citizen } from "src/entities/citizens.entity";
import { Repository } from "typeorm";
import { CitizenDTO, CitizenHistoryDTO, CitizenLoginDTO } from "src/DTO's/citizenDTO";
import { CitizenHistory } from "src/entities/history.entity";


@Injectable()
export class LoginService{
    
        constructor(
            @InjectRepository(Citizen)
            private citizenRepo: Repository<Citizen>,
            @InjectRepository(CitizenHistory)
            private historiesRepo: Repository<CitizenHistory>
    ){}



    
    //*************************citizen Login Service 
    async citizenLogin(loginInfo: CitizenLoginDTO) {
    const tempdata=await this.citizenRepo.findOneBy(
        {nid:loginInfo.nid,
        phoneNumber:loginInfo.phoneNumber
        }
        );
        
        if(tempdata)
        {
        let newActivity:CitizenHistoryDTO;
        newActivity={des:"logged in the System",citizenId:tempdata.id}
        
        this.historiesRepo.save(newActivity);
        return tempdata.id;
        }
        else{
            return 0;
        }
    }

}