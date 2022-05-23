import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1652399573902 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			insert into roles
				(id,name)
			values
				('cfbaedb4-85ba-4a21-81e7-4eac4f3838ce','Administrator');
		`);

		await queryRunner.query(`
			insert into users
				(id, name, email, "passwordHash")
			values(
				'3f106fdf-eb9f-4c78-a1cf-4c5c8c763fc6',
				'admin user 1',
				'adminuser1@gmail.com',
				'$2a$09$RaiNdoKZMZhOKpd2bu30zuNd/6GTeBQqxSiZVjCiVViWO8H3nv7Vy'
			);
		`);

		await queryRunner.query(`
			insert into users_roles
				("userId", "roleId")
			values(
				'3f106fdf-eb9f-4c78-a1cf-4c5c8c763fc6',
				'cfbaedb4-85ba-4a21-81e7-4eac4f3838ce'
			);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`delete from users`);
		await queryRunner.query(`delete from roles`);
	}
}
