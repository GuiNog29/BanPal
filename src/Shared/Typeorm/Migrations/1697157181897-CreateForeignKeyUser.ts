import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class CreateForeignKeyUser1697157181897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }
}
