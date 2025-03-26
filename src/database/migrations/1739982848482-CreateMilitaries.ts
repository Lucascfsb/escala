import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export default class CreateMilitaries1739982848482
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'militaries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'rank',
            type: 'enum',
            enum: [
              'Sd',
              'Cb',
              '3° Sgt',
              '2° Sgt',
              '1° Sgt',
              'Asp',
              '2° Ten',
              '1° Ten',
              'Cap',
              'Maj',
              'Ten-Cel',
              'Cel',
            ],
            isNullable: false,
          },
          {
            name: 'qualification',
            type: 'enum',
            enum: [
              'Formação',
              'Especialização',
              'Aperfeiçoamento',
              'Altos Estudos II',
              'Altos Estudos I',
            ],
            isNullable: false,
          },
          {
            name: 'date_of_entry',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
            onUpdate: 'now()',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('militaries')
  }
}
