import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export const ApiDoctorUnitOperations = {
  createDoctorUnit: () =>
    applyDecorators(
      ApiTags('doctor-units'),
      ApiBearerAuth('JWT-auth'),
      ApiOperation({
        summary: 'Associar médico a uma unidade',
        description:
          'Cria a associação entre um médico e uma unidade, definindo preço da consulta e status. Requer role **ADMIN**.',
      }),
      ApiBody({
        description: 'Dados para associação do médico à unidade',
        schema: {
          type: 'object',
          required: ['doctorId', 'unitId', 'consultationPrice'],
          properties: {
            doctorId: {
              type: 'string',
              example: 'clxyz123456789abcdef',
              description: 'ID do médico',
            },
            unitId: {
              type: 'string',
              example: 'clabc987654321fedcba',
              description: 'ID da unidade (hospital ou clínica)',
            },
            consultationPrice: {
              type: 'number',
              example: 150,
              description: 'Preço da consulta médica',
            },
            isPrimary: {
              type: 'boolean',
              example: true,
              description: 'Indica se esta é a unidade principal do médico',
            },
            isActive: {
              type: 'boolean',
              example: true,
              description: 'Status do médico nesta unidade',
            },
          },
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Associação criada com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'cmjiobll4000a34pwwa6xkybe',
            },
            doctorId: {
              type: 'string',
              example: 'cmjhja6fv0009n0pwqk73fd82',
            },
            unitId: {
              type: 'string',
              example: 'cmjhiz9ng0005i4pwx634gkuh',
            },
            consultationPrice: {
              type: 'number',
              example: 150,
            },
            isPrimary: {
              type: 'boolean',
              example: true,
            },
            isActive: {
              type: 'boolean',
              example: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-12-23T14:21:57.631Z',
            },

            unit: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: 'cmjhiz9ng0005i4pwx634gkuh',
                },
                name: {
                  type: 'string',
                  example: 'Hospital São José',
                },
                type: {
                  type: 'string',
                  example: 'HOSPITAL',
                },
                city: {
                  type: 'string',
                  example: 'São Paulo',
                },
                state: {
                  type: 'string',
                  example: 'SP',
                },
              },
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Erro de validação',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'string',
              example: 'Preço da consulta é obrigatório',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Médico ou unidade não encontrados',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example: 'Unidade inválida ou inativa',
            },
            errorCode: { type: 'string', example: 'UNIT_INVALID' },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Não autenticado — token JWT ausente ou inválido',
      }),
      ApiResponse({
        status: 403,
        description: 'Sem permissão — requer role ADMIN',
      }),
    ),

  updateDoctorUnit: () =>
    applyDecorators(
      ApiTags('doctor-units'),
      ApiBearerAuth('JWT-auth'),
      ApiOperation({
        summary: 'Editar associação médico-unidade',
        description:
          'Atualiza preço de consulta, status principal ou ativo de uma associação. Requer role **ADMIN**.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID da associação médico-unidade',
        example: 'cmjiobll4000a34pwwa6xkybe',
        type: 'string',
      }),
      ApiBody({
        description: 'Dados para atualização da associação',
        schema: {
          type: 'object',
          properties: {
            consultationPrice: {
              type: 'number',
              example: 200,
              description: 'Novo preço da consulta',
            },
            isPrimary: {
              type: 'boolean',
              example: false,
              description: 'Indica se esta é a unidade principal do médico',
            },
            isActive: {
              type: 'boolean',
              example: true,
              description: 'Status do médico nesta unidade',
            },
          },
        },
      }),
      ApiResponse({
        status: 200,
        description: 'Associação atualizada com sucesso',
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'string',
              example: 'Preço da consulta deve ser maior que zero',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Associação não encontrada',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhuma Unidade foi encontrado com os critérios: ID: abc123',
            },
            errorCode: { type: 'string', example: 'UNIT_NOT_FOUND' },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Não autenticado — token JWT ausente ou inválido',
      }),
      ApiResponse({
        status: 403,
        description: 'Sem permissão — requer role ADMIN',
      }),
    ),

  deleteDoctorUnit: () =>
    applyDecorators(
      ApiTags('doctor-units'),
      ApiBearerAuth('JWT-auth'),
      ApiOperation({
        summary: 'Desvincular médico de uma unidade',
        description:
          'Remove (soft delete) a associação entre um médico e uma unidade. Requer role **ADMIN**.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID da associação médico-unidade',
        example: 'cmjiobll4000a34pwwa6xkybe',
        type: 'string',
      }),
      ApiResponse({
        status: 204,
        description: 'Médico desvinculado com sucesso',
      }),
      ApiResponse({
        status: 404,
        description: 'Associação não encontrada',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhuma Unidade foi encontrado com os critérios: ID: abc123',
            },
            errorCode: { type: 'string', example: 'UNIT_NOT_FOUND' },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Não autenticado — token JWT ausente ou inválido',
      }),
      ApiResponse({
        status: 403,
        description: 'Sem permissão — requer role ADMIN',
      }),
    ),
};
