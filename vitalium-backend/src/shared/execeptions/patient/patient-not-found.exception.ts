import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class PatientNotFoundException extends ApplicationException {
  constructor(criteria?: string) {
    const message = `Nenhum paciente foi encontrado${
      criteria ? ` com os critérios: ${criteria}` : '.'
    }`;

    super(message, HttpStatus.NOT_FOUND, 'PATIENT_NOT_FOUND', { criteria });
  }
}
