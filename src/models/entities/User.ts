import { v4 as uuidV4 } from 'uuid';

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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
  url: string;

  @CreateDateColumn()
  created_at: Date;
}

export { User };