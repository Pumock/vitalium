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
import { CreateUnitUseCase } from '../../../application/use-cases/unit/create-unit.use-case';
import { SearchUnitUseCase } from '../../../application/use-cases/unit/search-unit.use-case';
import { UpdateUnitUseCase } from '../../../application/use-cases/unit/update-unit.use-case';
import { DeleteUnitUseCase } from '../../../application/use-cases/unit/delete-unit.use-case';
import { CreateUnitDTO } from '../../dto/unitDTO/create-unit.dto';
import { UpdateUnitDTO } from '../../dto/unitDTO/update-unit.dto';
import { ResponseUnitDTO } from '../../dto/unitDTO/response/unit-response.dto';
import { ApiUnitOperations } from '../../../shared/swagger/decorators';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../../shared/enums';

@Controller('units')
@UseGuards(AuthGuard, RolesGuard)
export class UnitController {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly searchUnitUseCase: SearchUnitUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
    private readonly deleteUnitUseCase: DeleteUnitUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  @ApiUnitOperations.createUnit()
  async createUnit(
    @Body() createUnitDTO: CreateUnitDTO,
  ): Promise<ResponseUnitDTO> {
    const unit = await this.createUnitUseCase.execute(createUnitDTO);

    return plainToInstance(ResponseUnitDTO, unit, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @ApiUnitOperations.findUnitById()
  async findUnitById(@Param('id') id: string): Promise<ResponseUnitDTO> {
    const unit = await this.searchUnitUseCase.execute(id);

    return plainToInstance(ResponseUnitDTO, unit, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @ApiUnitOperations.updateUnit()
  async updateUnit(
    @Param('id') id: string,
    @Body() updateUnitDTO: UpdateUnitDTO,
  ): Promise<ResponseUnitDTO> {
    const unit = await this.updateUnitUseCase.execute(id, updateUnitDTO);

    return plainToInstance(ResponseUnitDTO, unit, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  @ApiUnitOperations.deleteUnit()
  async deleteUnit(@Param('id') id: string): Promise<void> {
    await this.deleteUnitUseCase.execute(id);
  }
}
