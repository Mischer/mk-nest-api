import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageModel } from './top-page.model/top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page-dto';
import { Model } from 'mongoose';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageModel>) {}

	async create(dto: CreateTopPageDto): Promise<TopPageModel> {
		return this.topPageModel.create(dto);
	}

	async findById(id): Promise<TopPageModel | null> {
		return this.topPageModel.findById(id).exec();
	}

	async findAll(): Promise<TopPageModel[]> {
		return this.topPageModel.find({}).exec();
	}
	async findByAlias(alias): Promise<TopPageModel | null> {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async deleteById(id): Promise<TopPageModel | null> {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateTopPageDto): Promise<TopPageModel> {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return (
			this.topPageModel
				.aggregate([
					{
						$match: {
							firstCategory,
						},
					},
					{
						$group: {
							_id: { secondCategory: '$secondCategory' },
							pages: { $push: { alias: '$alias', title: '$title' } },
						},
					},
				])
				/*.match({
				firstCategory,
			})
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' } },
			})*/
				.exec()
		);
	}
	async findByText(text: string) {
		return this.topPageModel
			.find({
				$text: {
					$search: text,
					$caseSensitive: false,
				},
			})
			.exec();
	}
}
