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
				description: 'play a sound file',
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
		description: 'sound file to be played with the call',
		placeholder: 'https://api.twilio.com/cowbell.mp3',
		required: true,
		displayOptions: {
			show: {
				resource: ['play'],
				operation: ['play'],
			},
		},
	},
];
