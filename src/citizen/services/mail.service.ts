import { Injectable } from "@nestjs/common";
import { MailDTO, sentMailDTO } from "src/DTO's/mailDTO";
import { CitizenDTO, CitizenHistoryDTO } from "src/DTO's/citizenDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Citizen } from "src/entities/citizens.entity";
import { Repository } from "typeorm";
import { Mail } from "src/entities/mails.entity";
import { CitizenHistory } from "src/entities/history.entity";

@Injectable()
export class MailService {
    
    constructor(
                @InjectRepository(Mail)
                private mailRepo: Repository<Mail>,
                @InjectRepository(CitizenHistory)
                private historiesRepo: Repository<CitizenHistory>
    ){}


sendMail(mail:sentMailDTO){
    let newActivity:CitizenHistoryDTO;
    newActivity={des:"Email send",citizenId:mail.citizenId};
    this.mailRepo.save(mail);
    this.historiesRepo.save(newActivity);
    return mail;
}
async mailbox(mailAddress) {
    const mails=await this.mailRepo.find({where: 
                                        [{senderMail:mailAddress},
                                        {receiverMail:mailAddress}],
                                        
                                        })
    if(mails.length!=0){
        return mails;
    }
    else {
        return "Your Mail box is empty";
    }
    
}
deleteMail(id: any) {
    this.mailRepo.delete({id:id});
    return "Deleted";
}

getMailData(){
    return this.mailRepo.find();
}


}