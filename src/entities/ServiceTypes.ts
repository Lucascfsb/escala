import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import MilitaryDutyRoster from './MilitaryDutyRoster'
import ServiceRendered from './ServiceRendered'

@Entity('service_types')
class ServiceTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @OneToMany(
    () => ServiceRendered,
    serviceRendered => serviceRendered.serviceType
  )
  servicesRendered: ServiceRendered[]

  @OneToMany(
    () => MilitaryDutyRoster,
    (militaryDutyRoster: MilitaryDutyRoster) => militaryDutyRoster.serviceType
  )
  militaryDutyRosters: MilitaryDutyRoster[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default ServiceTypes
