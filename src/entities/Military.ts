import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ServiceRendered } from "./ServiceRendered";

export enum Rank {
  Soldado = "Soldado",
  Cabo = "Cabo",
  TresSargento = "3° Sargento",
  SegundoSargento = "2° Sargento",
  PrimeiroSargento = "1° Sargento",
  Aspirante = "Aspirante",
  SegundoTenente = "2° Tenente",
  PrimeiroTenente = "1° Tenente",
  Capitao = "Capitão",
  Major = "Major",
  TenenteCoronel = "Tenente-Coronel",
  Coronel = "Coronel",
}

export enum Qualification {
  Formacao = "Formação",
  Especializacao = "Especialização",
  Aperfeicoamento = "Aperfeiçoamento",
  AltosEstudosII = "Altos Estudos II",
  AltosEstudosI = "Altos Estudos I",
}

@Entity("militaries")
export class Military {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: Rank })
  rank: Rank;

  @Column({ type: "date", nullable: false })
  date_of_entry: Date;

  @Column({ type: "enum", enum: Qualification })
  qualification: Qualification;

  @OneToMany(
    () => ServiceRendered,
    (serviceRendered: ServiceRendered) => serviceRendered.military
  )
  servicesRendered: ServiceRendered[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
