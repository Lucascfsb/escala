import type { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm";

export class ServiceTypes1751296350701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "service_types",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "rank",
            type: "enum",
            enum: [
              "Sd",
              "Cb",
              "Serviço de Sgt",
              "Serviço de Oficial Subalterno",
              "Serviço de Oficial Superior",
            ],
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            isNullable: false,
            default: "now()",
            onUpdate: "now()",
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("service_types");
  }
}
