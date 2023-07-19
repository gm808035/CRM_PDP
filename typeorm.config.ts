import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'adminpwd',
  database: 'crm',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true, 
};
