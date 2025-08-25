import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ServiceRendered } from "./ServiceRendered";

@Entity("service_types")
export class ServiceType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  rank: string;

  @OneToMany(
    () => ServiceRendered,
    (serviceRendered) => serviceRendered.serviceType
  )
  servicesRendered: ServiceRendered[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  isActive: boolean;
}
