import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Citizen } from "src/entities/citizens.entity";

export const typeOrmConfig: TypeOrmModuleOptions={

        type:'postgres',
        host:'localhost',
        port:5432,
        username:'root',
        password:'psql2424',
        database:'Practice',
        entities:[Citizen],
        autoLoadEntities: true,
        synchronize:false
}