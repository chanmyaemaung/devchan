import { applyDecorators } from '@nestjs/common';
import { IsBoolean as DefaultIsBoolean, ValidationOptions } from 'class-validator';
import { ToBoolean } from '@/common/decorators';

/**
 * Checks if the value is a boolean. Works with query parameters.
 */
export const IsBoolean = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(DefaultIsBoolean(validationOptions), ToBoolean);
