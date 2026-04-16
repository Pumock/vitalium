import { Inject, Injectable } from '@nestjs/common';
import type { IUnitRepository } from '../../../domain/interfaces/repositories/units/unit.repository.interface';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';
import { UnitNotFoundException } from '../../../shared/execeptions/units/unit-not-found.exception';

@Injectable()
export class DeleteUnitUseCase {
  constructor(
    @Inject('IUnitRepository')
    private readonly unitRepository: IUnitRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const errors: FieldError[] = [];

    if (!id) {
      errors.push({
        field: 'id',
        value: id,
        constraints: ['ID é obrigatório'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    const unit = await this.unitRepository.findById(id);
    if (!unit) {
      throw new UnitNotFoundException(`ID: ${id}`);
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    try {
      await this.unitRepository.delete(id);
    } catch (error) {
      throw new DatabaseException('Erro ao deletar a unidade', error);
    }
  }
}
