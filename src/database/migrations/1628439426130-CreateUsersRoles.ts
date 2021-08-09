import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersRoles1628439426130 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_roles",
                columns: [
                    {
                        name: "userId",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "roleId",
                        type: "uuid",
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["userId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        onUpdate: "CASCADE"
                    },
                    {
                        columnNames: ["roleId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "roles",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_roles");
    }
}
