export enum TopLevelCategory {
	Cources,
	Services,
	Books,
	Products,
}

export class TopPageModel {
	firstCategory: TopLevelCategory;
	secondCategory: TopLevelCategory;
	title: string;
	category: string;
	hh?: {
		count: string;
		juniorSalary: number;
		middleSalary: number;
		seniorSalary: number;
	};
	advantages: {
		title: string;
		description: string;
	}[];
	seoText: string;
	tagsTitle: string;
	tags: string[];
}
