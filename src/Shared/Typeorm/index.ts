import { DataSource } from 'typeorm';

import { User } from '../../Domain/Entities/User';
import { Account } from '../../Domain/Entities/Account';

import { CreateAccount1696811819016 } from './Migrations/1696811819016-CreateAccount';
import { CreateUser1696379918005 } from './Migrations/1696379918005-CreateUser';
import { CreateForeignKeyAccount1697157172763 } from './Migrations/1697157172763-CreateForeignKeyAccount'
import { CreateForeignKeyUser1697157181897 } from './Migrations/1697157181897-CreateForeignKeyUser'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '154826',
  database: 'postgres',
  entities: [User, Account],
  migrations: [
    CreateAccount1696811819016,
    CreateUser1696379918005,
    CreateForeignKeyAccount1697157172763,
    CreateForeignKeyUser1697157181897
  ], 
});
