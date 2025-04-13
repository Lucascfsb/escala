import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Military from './Military'
import MilitaryDutyRoster from './MilitaryDutyRoster'
import ServiceTypes from './ServiceTypes'

@Entity('services_rendered')
class ServiceRendered {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: true })
  military_id: string

  @ManyToOne(
    () => Military,
    military => military.servicesRendered,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }
  )
  military: Military

  @Column({ type: 'uuid' })
  service_types_id: string

  @ManyToOne(
    () => ServiceTypes,
    serviceType => serviceType.servicesRendered,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  serviceType: ServiceTypes

  @OneToMany(
    () => MilitaryDutyRoster,
    (militaryDutyRoster: MilitaryDutyRoster) => militaryDutyRoster.military
  )
  militaryDutyRosters: MilitaryDutyRoster[]

  @Column({ type: 'timestamp with time zone' })
  service_date: Date

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date
}

export default ServiceRendered
