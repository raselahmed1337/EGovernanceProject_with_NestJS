import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignEntity } from "../../Entitys/campaignEntity/campaignentity.entity";

@Module({
imports: [TypeOrmModule.forFeature([CampaignEntity])],
controllers: [],
providers: []

})

export class CampaignModule {}