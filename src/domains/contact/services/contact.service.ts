import { apiService } from '../../../services/api.service';
import { API_ENDPOINTS } from '../../../utils/constants';
import type { ContactForm } from '../../../types';

export const contactService = {
  async sendMessage(data: ContactForm): Promise<{ success: boolean; message: string }> {
    const response = await apiService.post<{ success: boolean; message: string }>(
      API_ENDPOINTS.contact,
      data
    );
    return response.data;
  },
};
