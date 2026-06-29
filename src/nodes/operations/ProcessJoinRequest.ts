/**
 * Process Join Request Operation
 */

import {
  IExecuteFunctions,
} from 'n8n-workflow';
import axios from 'axios';

export async function processJoinRequest(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  const group = executeFunctions.getNodeParameter('group', 0) as string;
  const action = executeFunctions.getNodeParameter('action', 0) as string;
  const searchBy = executeFunctions.getNodeParameter('searchBy', 0) as string;
  const searchValue = executeFunctions.getNodeParameter('searchValue', 0) as string;

  try {
    const response = await axios.post(
      'https://api.skapi.pro/process-join-request',
      {
        group: group,
        action: action,
        [searchBy]: searchValue,
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
      throw new Error(response.data.error || 'Failed to process join request');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.data?.detail || error.message}`);
    }
    throw error;
  }
}
