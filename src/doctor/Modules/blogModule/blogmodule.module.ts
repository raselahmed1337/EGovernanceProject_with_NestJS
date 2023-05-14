import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "../../Entitys/blogEntity/blogentity.entity";

@Module({
imports: [TypeOrmModule.forFeature([BlogEntity])],
controllers: [],
providers: []

})

export class BlogModule {}