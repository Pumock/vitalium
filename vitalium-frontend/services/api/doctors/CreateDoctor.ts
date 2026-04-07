import { api } from '@/services/api/api';

export interface CreateDoctorPayload {
    userId: string; 
    specialty: string; 
    crm: string;
    consultationPrice: number;
    bio: string;
}

export interface CreatedDoctorModel {
    id: string;
    userId: string;
    specialty: string;
    crm: string;
    consultationPrice: number;
    bio: string;
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