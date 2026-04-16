import { api } from '@/services/api/api';

export interface CreateDoctorPayload {
    userId: string;
    crm: string;
    crmState: boolean;
    isActive: boolean;
}

export interface CreatedDoctorModel {
    id: string;
    userId: string;
    crm: string;
    crmState: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export const CreateDoctorService = {
    createDoctor: async (
        doctorData: CreateDoctorPayload
    ): Promise<CreatedDoctorModel> => {
        try {
            const response = await api.post('/doctors', doctorData);
            
            return response.data; 

        } catch (error) {
            console.error('Falha ao criar perfil de médico:', error);
            throw error;
        }
    },
};
