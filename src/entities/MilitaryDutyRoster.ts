import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import Military from './Military'
import ServiceTypes from './ServiceType'

@Entity('military_duty_roster')
class MilitaryDutyRoster {
  @PrimaryColumn({ type: 'uuid' })
  military_id: string

  @ManyToOne(
    () => Military,
    (military: Military) => military.militaryDutyRosters,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'military_id' })
  military: Military

  @PrimaryColumn({ type: 'uuid' })
  service_types_id: string

  @ManyToOne(
    () => ServiceTypes,
    (serviceType: ServiceTypes) => serviceType.militaryDutyRosters,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'service_types_id' })
  serviceType: ServiceTypes
}

export default MilitaryDutyRoster
