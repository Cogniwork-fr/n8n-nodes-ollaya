import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

import { BASE_URL_EXPRESSION, DEFAULT_BASE_URL } from '../nodes/Ollaya/api';

export class OllayaApi implements ICredentialType {
	name = 'ollayaApi';

	displayName = 'Ollaya API';

	documentationUrl = 'https://docs.typesafe.ai';

	icon: Icon = {
		light: 'file:../nodes/Ollaya/ollaya.svg',
		dark: 'file:../nodes/Ollaya/ollaya.dark.svg',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Create one in the TypeSafe AI console',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: DEFAULT_BASE_URL,
			placeholder: 'https://api.typesafe.ai',
			description: 'Server to call. Keep the default for the TypeSafe AI API, or enter the URL of your own server',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: BASE_URL_EXPRESSION,
			url: '/v1/models',
			method: 'GET',
		},
	};
}
