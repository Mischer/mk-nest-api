import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
	email: 'a1@test.tt',
	password: '1',
};

const testDto: CreateReviewDto = {
	name: 'Test',
	title: 'Title',
	description: 'Description test',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let accessToken: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto);
		accessToken = body.access_token;
	});

	it('/review/create (POST) -  success', async () => {
		const res = await request(app.getHttpServer()).post('/review/create').send(testDto);

		expect(res?.status).toEqual(201);
		expect(res?.body?._id).toBeDefined();
		createdId = res?.body?._id;
	});

	it('/review/create (POST) - fail', async () => {
		const res = await request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 6 });

		expect(res?.statusCode).toEqual(400);
		expect(res?.body?.message[0]).toEqual('Value too big');
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		const res = await request(app.getHttpServer())
			.get(`/review/byProduct/${productId}`)
			.set('Authorization', `Bearer ${accessToken}`);

		expect(res?.status).toEqual(200);
		expect(res?.body?.length).toBe(1);
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		const res = await request(app.getHttpServer())
			.get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
			.set('Authorization', `Bearer ${accessToken}`);

		expect(res?.status).toEqual(200);
		expect(res?.body?.length).toBe(0);
	});

	it('/review/:id (DELETE) - success', async () => {
		const res = await request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.set('Authorization', `Bearer ${accessToken}`);

		expect(res?.status).toEqual(200);
	});

	it('/review/:id (DELETE) - fail', async () => {
		const res = await request(app.getHttpServer())
			.delete(`/review/${new Types.ObjectId().toHexString()}`)
			.set('Authorization', `Bearer ${accessToken}`);

		expect(res?.status).toEqual(404);
		expect(res?.body?.message).toEqual(REVIEW_NOT_FOUND);
	});

	afterAll(() => {
		disconnect();
	});
});
