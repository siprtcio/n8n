import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { playFields, playOperations } from './PlayDescription';

export class Siprtc implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Siprtc',
		name: 'siprtc',
		icon: 'file:siprtc.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'play a sound file on calls',
		defaults: {
			name: 'Siprtc',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Play',
						value: 'play',
					},
				],
				default: 'play',
				required: true,
			},
			...playOperations,
			...playFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			let responseData;

			if (resource === 'play') {

				if (operation === 'play') {
					const media = this.getNodeParameter('soundfile', i) as string,
					responseData = `<Response><Say>Hello, this is a static TwiML response.</Say><Play>https://example.com/audio.mp3</Play></Response>`;
				}
			} else if (resource === 'say') {
				
			} else if (resource === 'gather') {
				
			}

			Array.isArray(responseData)
				? returnData.push(...(responseData as string[]))
				: returnData.push(responseData as string);
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
