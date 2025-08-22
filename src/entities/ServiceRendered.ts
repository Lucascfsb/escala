import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Military from './Military'
import ServiceTypes from './ServiceType'

@Entity('services_rendered')
class ServiceRendered {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: true })
  military_id: string | null

  @ManyToOne(() => Military)
  @JoinColumn({ name: 'military_id' })
  military: Military | null

  @Column({ type: 'uuid' })
  service_types_id: string

  @ManyToOne(() => ServiceTypes)
  @JoinColumn({ name: 'service_types_id' })
  serviceType: ServiceTypes

  @Column({ type: 'timestamp with time zone' })
  service_date: Date

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date
}

export default ServiceRendered
