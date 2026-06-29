/**
 * Check Notifications Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';
import axios from 'axios';

export async function checkNotifications(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  try {
    const response = await axios.post(
      'https://api.skapi.pro/check-notifications',
      {
        jwt_token: jwtToken,
        client_id: clientId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return response.data.result;
    } else {
      throw new Error(response.data.error || 'Failed to check notifications');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.data?.detail || error.message}`);
    }
    throw error;
  }
}
