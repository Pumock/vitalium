import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../../shared/enums';
import { ApiPatientOperations } from '../../../shared/swagger/decorators';
import { ApiTags } from '@nestjs/swagger';
import { PatientResponseDTO } from '../../dto/patientDTO/response/patient-response.dto';
import { CreatePatientDTO } from '../../dto/patientDTO/create-patient.dto';
import { UpdatePatientDTO } from '../../dto/patientDTO/update-patient.dto';
import { CreatePatientUseCase } from '../../../application/use-cases/patient/create-patient.use-case';
import { SearchPatientUseCase } from '../../../application/use-cases/patient/search-patient.use-case';
import { UpdatePatientUseCase } from '../../../application/use-cases/patient/update-patient.use-case';
import { DeletePatientUseCase } from '../../../application/use-cases/patient/delete-patient.use-case';

@ApiTags('patients')
@Controller('patients')
@UseGuards(AuthGuard, RolesGuard)
export class PatientController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly searchPatientUseCase: SearchPatientUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
    private readonly deletePatientUseCase: DeletePatientUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiPatientOperations.createPatient()
  @Roles(Role.ADMIN)
  async create(
    @Body() createPatientDTO: CreatePatientDTO,
  ): Promise<PatientResponseDTO> {
    const patient = await this.createPatientUseCase.execute(createPatientDTO);

    return plainToInstance(PatientResponseDTO, patient, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPatientOperations.findAllPatients()
  @Roles(Role.ADMIN, Role.DOCTOR, Role.NURSE)
  async findAll(): Promise<PatientResponseDTO[]> {
    const patients = await this.searchPatientUseCase.findAll();

    return plainToInstance(PatientResponseDTO, patients, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiPatientOperations.findPatientById()
  @Roles(Role.ADMIN, Role.DOCTOR, Role.NURSE)
  async findOne(@Param('id') id: string): Promise<PatientResponseDTO> {
    const patient = await this.searchPatientUseCase.findById(id);

    return plainToInstance(PatientResponseDTO, patient, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiPatientOperations.updatePatient()
  @Roles(Role.ADMIN, Role.DOCTOR)
  async update(
    @Param('id') id: string,
    @Body() updatePatientDTO: UpdatePatientDTO,
  ): Promise<PatientResponseDTO> {
    const patient = await this.updatePatientUseCase.execute(
      id,
      updatePatientDTO,
    );

    return plainToInstance(PatientResponseDTO, patient, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiPatientOperations.deletePatient()
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string): Promise<void> {
    return this.deletePatientUseCase.execute(id);
  }
}
