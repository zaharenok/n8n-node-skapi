/**
 * SkAPI.pro Node for n8n
 * Automate Skool communities
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import { checkJoinRequests } from './operations/CheckJoinRequests';
import { processJoinRequest } from './operations/ProcessJoinRequest';
import { checkMessages } from './operations/CheckMessages';
import { checkNotifications } from './operations/CheckNotifications';
import { sendWelcomeMessage } from './operations/SendWelcomeMessage';

export class SkapiProNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'SkAPI.pro',
    name: 'skapiPro',
    icon: 'file:skapi.svg',
    group: ['transform'],
    version: 1,
    description: 'Automate Skool communities with SkAPI.pro',
    defaults: {
      name: 'SkAPI.pro',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'skapiApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          {
            name: 'Join Request',
            value: 'joinRequest',
            description: 'Manage join requests',
          },
          {
            name: 'Message',
            value: 'message',
            description: 'Check and manage messages',
          },
          {
            name: 'Notification',
            value: 'notification',
            description: 'Check Skool notifications',
          },
        ],
        default: 'joinRequest',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['joinRequest'],
          },
        },
        options: [
          {
            name: 'Check Join Requests',
            value: 'checkJoinRequests',
            description: 'Get pending join requests',
            action: 'checkJoinRequests',
          },
          {
            name: 'Process Join Request',
            value: 'processJoinRequest',
            description: 'Approve or decline join request',
            action: 'processJoinRequest',
          },
          {
            name: 'Send Welcome Message',
            value: 'sendWelcomeMessage',
            description: 'Send welcome message to new member',
            action: 'sendWelcomeMessage',
          },
        ],
        default: 'checkJoinRequests',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['message'],
          },
        },
        options: [
          {
            name: 'Check Messages',
            value: 'checkMessages',
            description: 'Get new messages in group',
            action: 'checkMessages',
          },
        ],
        default: 'checkMessages',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['notification'],
          },
        },
        options: [
          {
            name: 'Check Notifications',
            value: 'checkNotifications',
            description: 'Get Skool notifications',
            action: 'checkNotifications',
          },
        ],
        default: 'checkNotifications',
      },
      // Group URL parameter
      {
        displayName: 'Group URL or ID',
        name: 'group',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['checkJoinRequests', 'sendWelcomeMessage', 'checkMessages'],
          },
        },
        required: true,
        default: '',
        placeholder: 'ai-pays-my-bills-7018',
        description: 'Skool group URL or ID',
      },
      // Process Join Request parameters
      {
        displayName: 'Action',
        name: 'action',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['processJoinRequest'],
          },
        },
        options: [
          {
            name: 'Approve',
            value: 'approve',
          },
          {
            name: 'Decline',
            value: 'decline',
          },
        ],
        default: 'approve',
      },
      {
        displayName: 'Search By',
        name: 'searchBy',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['processJoinRequest'],
          },
        },
        options: [
          {
            name: 'Name',
            value: 'name',
          },
          {
            name: 'Email',
            value: 'email',
          },
          {
            name: 'Profile URL',
            value: 'profile_url',
          },
        ],
        default: 'name',
      },
      {
        displayName: 'Search Value',
        name: 'searchValue',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['processJoinRequest'],
          },
        },
        required: true,
        default: '',
        placeholder: 'John Doe',
      },
      // Welcome message parameters
      {
        displayName: 'Welcome Message',
        name: 'welcomeMessage',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['sendWelcomeMessage'],
          },
        },
        required: false,
        default: 'Welcome to our community! 🎉',
        description: 'Message to send to new member',
        typeOptions: {
          rows: 4,
        },
      },
      // Additional options
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['checkJoinRequests', 'checkMessages'],
          },
        },
        default: 20,
        description: 'Maximum number of results',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;
    const credentials = await this.getCredentials('skapiApi');

    if (!credentials || !credentials.jwtToken) {
      throw new Error('No valid credentials found');
    }

    const jwtToken = credentials.jwtToken as string;
    const clientId = credentials.clientId as string | undefined;

    try {
      let result;

      switch (resource) {
        case 'joinRequest':
          switch (operation) {
            case 'checkJoinRequests':
              result = await checkJoinRequests(
                this,
                jwtToken,
                clientId
              );
              break;
            case 'processJoinRequest':
              result = await processJoinRequest(
                this,
                jwtToken,
                clientId
              );
              break;
            case 'sendWelcomeMessage':
              result = await sendWelcomeMessage(
                this,
                jwtToken,
                clientId
              );
              break;
            default:
              throw new Error(`Unknown operation: ${operation}`);
          }
          break;

        case 'message':
          switch (operation) {
            case 'checkMessages':
              result = await checkMessages(
                this,
                jwtToken,
                clientId
              );
              break;
            default:
              throw new Error(`Unknown operation: ${operation}`);
          }
          break;

        case 'notification':
          switch (operation) {
            case 'checkNotifications':
              result = await checkNotifications(
                this,
                jwtToken,
                clientId
              );
              break;
            default:
              throw new Error(`Unknown operation: ${operation}`);
          }
          break;

        default:
          throw new Error(`Unknown resource: ${resource}`);
      }

      // Format result for n8n
      if (Array.isArray(result)) {
        returnData.push(...result.map(item => ({ json: item })));
      } else {
        returnData.push({ json: result });
      }

      return [returnData];
    } catch (error) {
      throw error;
    }
  }
}
