import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class AdminAlreadyExistsException extends ApplicationException {
  constructor(criteria: string) {
    super(
      `Admin já está cadastrado no sistema: ${criteria}`,
      HttpStatus.CONFLICT,
      'ADMIN_ALREADY_EXISTS',
      { criteria },
    );
  }
}
