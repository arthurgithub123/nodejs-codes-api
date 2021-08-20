import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { v4 as uuidv4 } from 'uuid';

import { User } from "./User";

@Entity("user_tokens")
class UserTokens {
  constructor() {
    if(!this.id) {
      this.id = uuidv4()
    }
  }

  @PrimaryColumn()
  id?: string;

  @Column()
  token: string;

  @Column()
  expiresIn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.tokens, { eager: true })
  user: User
}

export { UserTokens };
