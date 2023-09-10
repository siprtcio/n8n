import type { INodeProperties } from 'n8n-workflow';

export const playOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['play'],
			},
		},
		options: [
			{
				name: 'Play',
				value: 'play',
				description: 'Play a sound file',
				action: 'Play a Sound File',
			},
		],
		default: 'play',
	},
];

export const playFields: INodeProperties[] = [
	// ----------------------------------
	//           play: play
	// ----------------------------------
	{
		displayName: 'Sound File',
		name: 'soundfile',
		type: 'string',
		default: '',
		description: 'Sound file to be played with the call',
		placeholder: 'https://api.twilio.com/cowbell.mp3',
		required: true,
		displayOptions: {
			show: {
				resource: ['play'],
				operation: ['play'],
			},
		},
	},
	{
		displayName: 'Loop',
		name: 'loop',
		type: 'number',
		default: '',
		description: 'Number of loops play file to be played',
		placeholder: '1',
		required: true,
		displayOptions: {
			show: {
				resource: ['play'],
				operation: ['play'],
			},
		},
	},
	{
		displayName: 'Dtmf Digit',
		name: 'dtmfDigits',
		type: 'string',
		default: '',
		description: 'Send DTMF digits to connected voice call',
		placeholder: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['play'],
				operation: ['play'],
			},
		},
	},
];
