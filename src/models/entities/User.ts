import { v4 as uuidV4 } from 'uuid';

import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

import { Role } from './Role';

@Entity('users')
class User {
  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}

export { User };