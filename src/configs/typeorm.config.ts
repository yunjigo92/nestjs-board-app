import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'yunji',
    password : 'yunji',
    database : 'boards',
    entities : [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : true
}