import { Inject, Injectable } from '@nestjs/common';
import { ValidationException } from '../../../shared/execeptions/system/validation.exception';
import { PatientNotFoundException } from '../../../shared/execeptions/patient/patient-not-found.exception';
import type { IPatientRepository } from '../../../domain/interfaces/repositories/patient/patient.repository.interface';
import type { Patient } from '../../../infrastructure/database/models/patient.models';

@Injectable()
export class SearchPatientUseCase {
  constructor(
    @Inject('IPatientRepository')
    private readonly patientRepository: IPatientRepository,
  ) {}

  async findById(id: string): Promise<Patient> {
    if (!id) {
      throw new ValidationException([
        {
          field: 'id',
          value: id,
          constraints: ['ID é obrigatório'],
        },
      ]);
    }

    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new PatientNotFoundException(`ID: ${id}`);
    }

    return patient;
  }

  async findAll(): Promise<Patient[]> {
    const patients = await this.patientRepository.findAll();

    if (!patients || patients.length === 0) {
      throw new PatientNotFoundException();
    }

    return patients;
  }
}
