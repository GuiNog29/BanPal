import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUser1696379918005 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "User",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment"
        },
        {
          name: "name",
          type: "varchar"
        },
        {
          name: "password",
          type: "varchar"
        },
        {
          name: "accountId",
          type: "int",
          isNullable: true
        },
      ]
    }), true);

    await queryRunner.createForeignKey(
      "User",
      new TableForeignKey({
        columnNames: ["accountId"],
        referencedColumnNames: ["id"],
        referencedTableName: "account",
        onDelete: "CASCADE"
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("User", "FK_User_Account");
    await queryRunner.dropTable("User");
  }

}
