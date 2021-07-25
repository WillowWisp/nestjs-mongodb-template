import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
// import { CustomServerError } from "../exceptions/custom-server-error.exception";
// import { logError } from "../utils/logging.util";

@Injectable()
export class AppValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    const errors = await validate(object).catch((err) => {
      const errorStr = JSON.stringify(err, Object.getOwnPropertyNames(err));
      throw errorStr;
      // logError('Validation error', errorStr);
      // throw new CustomServerError({
      //   message: 'custom/validation-failed',
      //   detailMessage: errorStr,
      // });
    });

    if (errors.length > 0) {
      const errorList = errors.map((entry) => ({
        name: entry.property,
        constraints: entry.constraints,
        children: entry.children,
      }));

      return errorList;

      // logError('Validation error', JSON.stringify(errorList));
      // throw new CustomServerError({
      //   message: 'custom/validation-failed',
      //   detailMessage: errorList,
      // });
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
