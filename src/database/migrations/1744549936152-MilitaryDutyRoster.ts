import {
  type MigrationInterface,
  type QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class MilitaryDutyRoster1744549936152 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'military_duty_roster',
        columns: [
          {
            name: 'military_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'service_types_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      })
    )

    await queryRunner.createForeignKeys('military_duty_roster', [
      new TableForeignKey({
        name: 'FK_military_duty_roster_military_id',
        columnNames: ['military_id'],
        referencedTableName: 'militaries',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_military_service_types_service_types_id',
        columnNames: ['service_types_id'],
        referencedTableName: 'service_types',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('military_duty_roster', [
      new TableForeignKey({
        name: 'FK_military_duty_roster_military_id',
        columnNames: ['military_id'],
        referencedTableName: 'militaries',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_military_service_types_service_types_id',
        columnNames: ['service_types_id'],
        referencedTableName: 'service_types',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ])

    await queryRunner.dropTable('military_duty_roster')
  }
}
