import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class CreateForeignKeyAccount1697157172763 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "Account",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "User",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("Account", "FK_Account_User");
  }
}
