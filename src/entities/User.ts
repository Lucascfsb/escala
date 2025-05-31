import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Role {
  Admin = 'admin',
  usuário = 'usuário',
  consulta = 'consulta',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  avatar: string

  @Column({ type: 'enum', enum: Role })
  role: Role

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
