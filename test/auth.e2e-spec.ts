import { AuthDto } from '../src/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
	email: 'a1@test.tt',
	password: '1',
};
describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success', async () => {
		const res = await request(app.getHttpServer()).post('/auth/login').send(loginDto);

		expect(res?.status).toEqual(200);
		expect(res?.body?.access_token).toBeDefined();
	});

	it('/review/create (POST) - fail password', async () => {
		const res = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '2' });

		expect(res?.status).toEqual(401);
		expect(res?.body?.message).toBe(WRONG_PASSWORD_ERROR);
		expect(res?.body?.error).toBe('Unauthorized');
	});

	it('/review/create (POST) - fail login', async () => {
		const res = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, email: '2@tt.tt' });

		expect(res?.status).toEqual(401);
		expect(res?.body?.message).toBe(USER_NOT_FOUND_ERROR);
		expect(res?.body?.error).toBe('Unauthorized');
	});

	afterAll(() => {
		disconnect();
	});
});
