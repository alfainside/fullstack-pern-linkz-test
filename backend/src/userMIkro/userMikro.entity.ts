import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity()
export class user extends BaseEntity {
  @PrimaryKey()
  id = uuid();

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  name!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

export interface UserNewInstance {
  id?: string;
  username: string;
  password: string;
  name: string;
  token?: string;
}
