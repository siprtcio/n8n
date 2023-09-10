import type { INodeProperties } from 'n8n-workflow';

export const sayOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['say'],
			},
		},
		options: [
			{
				name: 'Say',
				value: 'say',
				description: 'Say a sound file',
				action: 'Say a Sound File',
			},
		],
		default: 'say',
	},
];

export const sayFields: INodeProperties[] = [
	// ----------------------------------
	//           say: say
	// ----------------------------------
	{
		displayName: 'Text',
		name: 'saytext',
		type: 'string',
		default: '',
		description: 'Text to be play, text convert to speech and play on call',
		placeholder: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['say'],
				operation: ['say'],
			},
		},
	},
];
