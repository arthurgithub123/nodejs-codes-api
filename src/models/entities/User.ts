import { v4 as uuidV4 } from 'uuid';

import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

import { Role } from './Role';
import { UserTokens } from './UserTokens';

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

  @ManyToMany(() => Role, role => role.users, { eager: true })
  @JoinTable({
    name: "users_roles",
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "roleId", referencedColumnName: "id" }
  })
  roles: Role[];

  @OneToMany(() => UserTokens, userTokens => userTokens.user)
  tokens: UserTokens[];
}

export { User };
