/**
 * Check Messages Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';
import axios from 'axios';

export async function checkMessages(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;
  const limit = executeFunctions.getNodeParameter('limit', 0) as number;

  try {
    const response = await axios.post(
      'https://api.skapi.pro/check-messages',
      {
        group: group,
        limit: limit || 20,
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
      throw new Error(response.data.error || 'Failed to check messages');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.data?.detail || error.message}`);
    }
    throw error;
  }
}
