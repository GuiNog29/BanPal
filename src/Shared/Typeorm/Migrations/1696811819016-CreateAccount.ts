import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAccount1696811819016 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "Account",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment"
        },
        {
          name: "balance",
          type: "decimal",
          precision: 10,
          scale: 2
        }, {
          name: "UserId",
          type: "int"
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("Account", "FK_Account_User");
    await queryRunner.dropTable("Account");
  }
}
