import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from '../base/application.exception';

export class PatientAlreadyExistsException extends ApplicationException {
  constructor(cpf: string) {
    super(
      `Paciente com CPF ${cpf} já está cadastrado no sistema`,
      HttpStatus.CONFLICT,
      'PATIENT_ALREADY_EXISTS',
      { cpf },
    );
  }
}
