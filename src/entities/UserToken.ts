import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import User from './User'

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  token: string

  @Column('uuid')
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column('timestamp with time zone')
  expires_at: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default UserToken
