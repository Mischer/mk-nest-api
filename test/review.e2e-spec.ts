import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

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

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST)', async () => {
		const res = await request(app.getHttpServer()).post('/review/create').send(testDto);

		expect(res?.status).toEqual(201);
		expect(res?.body?._id).toBeDefined();
		createdId = res?.body?._id;
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		const res = await request(app.getHttpServer()).get(`/review/byProduct/${productId}`);

		expect(res?.status).toEqual(200);
		expect(res?.body?.length).toBe(1);
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		const res = await request(app.getHttpServer()).get(
			`/review/byProduct/${new Types.ObjectId().toHexString()}`,
		);

		expect(res?.status).toEqual(200);
		expect(res?.body?.length).toBe(0);
	});

	it('/review/:id (DELETE) - success', async () => {
		const res = await request(app.getHttpServer()).delete(`/review/${createdId}`);

		expect(res?.status).toEqual(200);
	});

	it('/review/:id (DELETE) - fail', async () => {
		const res = await request(app.getHttpServer()).delete(
			`/review/${new Types.ObjectId().toHexString()}`,
		);

		expect(res?.status).toEqual(404);
		expect(res?.body?.message).toEqual(REVIEW_NOT_FOUND);
	});

	afterAll(() => {
		disconnect();
	});
});
