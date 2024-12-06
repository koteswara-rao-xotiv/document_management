import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, BeforeInsert } from 'typeorm';
import { Role } from '../role/role.entity';
import { Document } from '../document/document.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Document, document => document.author)
  documents: Document[];

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
