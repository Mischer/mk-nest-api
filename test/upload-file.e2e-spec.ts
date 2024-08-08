import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as path from 'path';
import { format } from 'date-fns';

describe('FilesController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('/files/upload (POST) should upload a file', async () => {
		const filePath = path.resolve(__dirname, 'test-files', 'test.jpg');

		const response = await request(app.getHttpServer())
			.post('/files/upload')
			.set('Content-Type', 'multipart/form-data')
			.attach('file', filePath);

		expect(response.status).toBe(200);
		const date = format(new Date(), 'yyyy-MM-dd');
		expect(response.body).toEqual([{ name: 'test.jpg', url: `${date}/test.jpg` }]);
	});
});
