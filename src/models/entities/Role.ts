import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { v4 as uuidV4 } from 'uuid';

import { User } from "./User";

@Entity("roles")
class Role {
  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}

export { Role };