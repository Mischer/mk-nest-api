import { Controller, Get, Header } from '@nestjs/common';
import { TopPageService } from '../top-page/top-page.service';
import { ConfigService } from '@nestjs/config';
import { addDays, format, subDays } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constants';
@Controller('sitemap')
export class SitemapController {
	domain: string;
	constructor(
		private readonly topPageService: TopPageService,
		private readonly configService: ConfigService,
	) {
		this.domain = this.configService.get('DOMAIN') ?? '';
	}

	@Get('xml')
	@Header('content-type', 'text/xml')
	async sitemap() {
		const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
		let res = [
			{
				loc: this.domain,
				lastmod: format(subDays(new Date(), 1), formatString),
				changefreq: 'daily',
				priority: '1',
			},
			{
				loc: `${this.domain}/courses`,
				lastmod: format(subDays(new Date(), 1), formatString),
				changefreq: 'daily',
				priority: '1',
			},
		];

		const pages = await this.topPageService.findAll();
		res = res.concat(
			pages.map((page) => {
				return {
					loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${page.alias}`,
					lastmod: format(subDays(new Date(), 1), formatString),
					changefreq: 'daily',
					priority: '0.7',
				};
			}),
		);
		const builder = new Builder({
			xmldec: { version: '1.0', encoding: 'UTF-8' },
		});
		return builder.buildObject({
			urlSet: {
				$: {
					xmlns: 'http://www.sitemap.org/schemas/sitemap/0.9',
				},
				url: res,
			},
		});
	}
}
