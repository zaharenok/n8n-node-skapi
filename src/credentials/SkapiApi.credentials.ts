/**
 * SkAPI.pro API Credentials for n8n
 */

import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class SkapiApiCredentials implements ICredentialType {
  name = 'skapiApi';
  displayName = 'SkAPI.pro API';
  documentationUrl = 'https://skapi.pro';
  properties: INodeProperties[] = [
    {
      displayName: 'JWT Token',
      name: 'jwtToken',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'JWT token from SkAPI.pro extension or account',
    },
    {
      displayName: 'Client ID (Optional)',
      name: 'clientId',
      type: 'string',
      default: '',
      description: 'Client ID for tracking (optional)',
    },
  ];
}
