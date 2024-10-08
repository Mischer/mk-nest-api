import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ID_VALIDATION_ERROR } from './id-validation.constants';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata): any {
		if (metadata.type !== 'param') {
			return value;
		}

		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException(ID_VALIDATION_ERROR);
		}

		return value;
	}
}
